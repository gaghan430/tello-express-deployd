## dpd-collection-systemfields - System audit fields for deployd Collections

This collection extension allows you to easily track creation and change of objects in your deployd collections.
Currently the following audit fields are supported:
* `createdBy`, the creating user's id - or `(root)` or `(anonymous)`
* `createdDate`, timestamp (`Date.getTime()`) of the object's creation
* `lastModifiedBy`, the user's id who edited this object last - or `(root)` or `(anonymous)`
* `lastModifiedDate`, timestamp (`Date.getTime()`) of the object's last edit

The user can choose which audit fields to enable by simply creating the desired fields in the deployd dashboard.
Any non-existing field will be untouched.

**Note** these fields are not *protected* by default, i.e. the end user may try to write any value into them. 
You need to protect the values in any write-event by specifying `protect('createdBy');` in the event handler.

### Requirements

* deployd (you'd have guessed that, probably :-))
* Any Collection with some (or all) of these custom fields:
```json
    [
        "createdBy": {
            "name": "createdBy",
            "type": "string",
            "typeLabel": "string",
            "required": false,
            "id": "createdBy",
            "order": 0
        },
        "createdDate": {
            "name": "createdDate",
            "type": "number",
            "typeLabel": "number",
            "required": false,
            "id": "createdDate",
            "order": 1
        },
        "lastModifiedBy": {
            "name": "lastModifiedBy",
            "type": "string",
            "typeLabel": "string",
            "required": false,
            "id": "lastModifiedBy",
            "order": 2
        },
        "lastModifiedDate": {
            "name": "lastModifiedDate",
            "type": "number",
            "typeLabel": "number",
            "required": false,
            "id": "lastModifiedDate",
            "order": 3
        }
    ]
```

### Installation

In your app's root directory, type `npm install dpd-collection-systemfields` into the command line or [download the source](https://bitbucket.org/simpletechs/dpd-collection-systemfields). This should create a `dpd-collection-systemfields` directory in your app's `node_modules` directory.

See [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.

### Setup

Create the fields you want to be managed on every Collection you want them on.
No additional setup is required, as every `Collection` (and every `Resource` that inherits from `Collection`) is automatically extended.

### Usage

View the fields in the dashboard or have them displayed in your app.

### Credits

`dpd-collection-systemfields` is the work of [simpleTechs.net](https://www.simpletechs.net)