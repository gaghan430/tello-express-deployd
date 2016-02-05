var systemProps = [
  {
    name: 'createdDate',
    type: 'number',
    value: function(item, create, ctx) {
      return new Date().getTime();
    },
    shouldUpdate: function(item, create, ctx) {
      return create;
    }
  },
  {
    name: 'lastModifiedDate',
    type: 'number',
    value: function(item, create, ctx) {
      return new Date().getTime();
    },
    shouldUpdate: function(item, create, ctx) {
      return true;
    }
  },
  {
    name: 'createdBy',
    type: 'string',
    value: function(item, create, ctx) {
      return (ctx.session.isRoot?
                '(root)'
                :(ctx.session.user?
                    ctx.session.user.id
                    :'(anonymous)'
                )
              );
    },
    // only update on create
    // and if !(userEditable && prop set)
    shouldUpdate: function(item, create, ctx, collectionProp) {
      return create && !(collectionProp.userEditable && item.createdBy);
    }
  },
  {
    name: 'lastModifiedBy',
    type: 'string',
    value: function(item, create, ctx) {
      return (ctx.session.isRoot?
                '(root)'
                :(ctx.session.user?
                    ctx.session.user.id
                    :'(anonymous)'
                )
              );
    },
    shouldUpdate: function(item, create, ctx, collectionProp) {
      return true && !(collectionProp.userEditable && item.lastModifiedBy);
    }
  }
];
(function(Collection) {
  var _save = Collection.prototype.save,
      _validate = Collection.prototype.validate,
      systemfieldsContexts = [];
  
  // this is a bit ugly, because in order to have the ctx avaiable in validation, we need to get it out of the save method
  Collection.prototype.save = function(ctx, fn) {
    // save context for our custom validation hook
    systemfieldsContexts.unshift(ctx);
    
    //run default save
    var res = _save.call(this, ctx, function() {
      // drop context from our custom validation hook
      systemfieldsContexts.shift();

      return fn.apply(this, arguments);
    });
    return res;
  };

  Collection.prototype.validate = function(body, create) {
    var res = _validate.apply(this, arguments), ctx = systemfieldsContexts.length && systemfieldsContexts[0];

    // don't run if we were not instructed to
    if(!ctx) {
      return res;
    }

    var collectionProps = this.properties;
    systemProps.forEach(function(systemProp) {
      // we may only set properties that the user created
      if(!collectionProps[systemProp.name] || !collectionProps[systemProp.name].type == systemProp.type) {
        return;
      }

      // we may not want to set every property
      if(!systemProp.shouldUpdate(body, create, ctx, collectionProps[systemProp.name])) {
        return;
      }

      body[systemProp.name] = systemProp.value(body, create, ctx);
    });

    return res;
  };
})(require('deployd/lib/resources/collection/index'));
