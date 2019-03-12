export default {
    "da": {
        "users": {
            "singular": "Bruger",
            "plural": "Brugere",
            "index": {
                "new": "Opret ny bruger",
                "name": "Navn",
                "edit": "Rediger bruger",
                "email": "Email"
            },
            "upsert": {
                "create": "Opret bruger",
                "delete": "Slet bruger",
                "details": "Brugerinformation",
                "name": "Navn",
                "email": "Email"
            }
        }
    },
    "en": {
        "errors": {
            "401": {
                "title": "Unauthenticated - 401",
                "description": "",
                "link_text": "Go to Dashboard"
            },
            "403": {
                "title": "Unauthorized - 403",
                "description": "You do not possess the necessary permissions to visit this page. Contact the system\n                    administrator if you need access to this particular page.",
                "link_text": "Go to Dashboard"
            },
            "404": {
                "title": "Page not found - 404",
                "description": "The requested page could not be found",
                "link_text": "Go to Dashboard"
            }
        },
        "searchables": {
            "singular": "Searchable",
            "plural": "Searchables",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "status": "Status",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "passwords": {
            "password": "Passwords must be at least six characters and match the confirmation.",
            "reset": "Your password has been reset!",
            "sent": "We have e-mailed your password reset link!",
            "token": "This password reset token is invalid.",
            "user": "We can't find a user with that e-mail address."
        },
        "fixtures": {
            "singular": "Fixture",
            "plural": "Fixtures",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "image": "Image",
                "width": "Width",
                "height": "Height",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "folders": {
            "singular": "Folder",
            "plural": "Folders",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "auth": {
            "failed": "These credentials do not match our records.",
            "throttle": "Too many login attempts. Please try again in {seconds} seconds."
        },
        "roles": {
            "singular": "Role",
            "plural": "Roles",
            "attributes": {
                "id": "ID",
                "name": "Name"
            },
            "permissions": "Role Permissions"
        },
        "tokens": {
            "singular": "Token",
            "plural": "Tokens",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "token": "Token",
                "role": "Role"
            }
        },
        "templates": {
            "singular": "Template",
            "plural": "Templates",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "activated": "Activated",
                "content": "Content",
                "hook": "Hook",
                "layout": "Layout",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "floors": {
            "singular": "Floor",
            "plural": "Floors",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "level": "Level",
                "place_id": "Place ID"
            },
            "show": {
                "edit": "Edit Building",
                "floors": "Floors at",
                "new_floor": "Add new Floor",
                "map_plan": "Map Plan",
                "pois": "Points of Interest",
                "edit_floor": "Edit Floor",
                "name": "Name",
                "creator": "Creator",
                "actions": "Actions"
            },
            "upsert": {
                "delete": "Delete Building",
                "create": "Create Building",
                "details": "Building Details",
                "name": "Name"
            }
        },
        "pagination": {
            "previous": "&laquo; Previous",
            "next": "Next &raquo;"
        },
        "buildings": {
            "singular": "Building",
            "plural": "Buildings",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "image": "Image",
                "place_id": "Place ID"
            },
            "map_plan": "Map Plan"
        },
        "locations": {
            "singular": "Location",
            "plural": "Locations",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "type": "Type",
                "zoom_from": "Zoom From",
                "zoom_to": "Zoom To",
                "title": "Title",
                "subtitle": "Subtitle",
                "image": "Image",
                "description": "Description",
                "contact_name": "Name",
                "company": "Company",
                "address": "Address",
                "city": "City",
                "postcode": "Postal Code",
                "phone": "Phone",
                "email": "Email",
                "search_activated": "Search Activated",
                "search_text": "Search Text"
            }
        },
        "users": {
            "singular": "User",
            "plural": "Users",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "email": "Email",
                "avatar": "Avatar",
                "locale": "Locale",
                "password": "Password",
                "activated": "Activated",
                "remember_token": "Remember Token",
                "role": "Role",
                "category": "Category",
                "tags": "Tags"
            },
            "password_placeholder": "Only fill out if changing password"
        },
        "menu": {
            "dashboard": "Dashboard",
            "places": "Places",
            "beacons": "Beacons",
            "pois": "Points of Interest",
            "fixtures": "Fixtures",
            "containers": "Content",
            "locations": "Locations",
            "user_management": "User Management",
            "users": "Users",
            "roles": "Roles",
            "tokens": "API Tokens",
            "settings": "Settings",
            "categories": "Categories",
            "tags": "Tags",
            "map_components": "Map Components",
            "searchables": "Searchables",
            "map-settings": "Map Settings",
            "email_layouts": "Email Layouts",
            "email_templates": "Email Templates",
            "account": "My Account",
            "profile": "Profile",
            "log_out": "Log out"
        },
        "containers": {
            "singular": "Container",
            "plural": "Containers",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "folders_enabled": "Folders enabled",
                "folders": "Folders",
                "category": "Category",
                "tags": "Tags",
                "beacons": "Beacons"
            }
        },
        "places": {
            "singular": "Place",
            "plural": "Places",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "address": "Address",
                "postcode": "Postal Code",
                "city": "City",
                "image": "Image",
                "lat": "Latitude",
                "lng": "Longitude",
                "activated": "Activated",
                "category": "Category",
                "tags": "Tags"
            },
            "location": "Place location"
        },
        "tags": {
            "singular": "Tag",
            "plural": "Tags",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description"
            }
        },
        "profile": {
            "title": "My Profile",
            "name": "Name",
            "email": "Email",
            "locale": "Language",
            "password": "Password",
            "password_placeholder": "Only fill out if changing password",
            "role": "Role"
        },
        "map-components": {
            "singular": "Map Component",
            "plural": "Map Components",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "type": "Type",
                "description": "Description",
                "shape": "Shape",
                "color": "Color",
                "opacity": "Opacity",
                "weight": "Weight",
                "curved": "Curved",
                "image": "Image",
                "thickness": "Thickness",
                "width": "Width",
                "height": "Height",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "layouts": {
            "singular": "Layout",
            "plural": "Layouts",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "content": "Content",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "validation": {
            "accepted": "The {attribute} must be accepted.",
            "active_url": "The {attribute} is not a valid URL.",
            "after": "The {attribute} must be a date after {date}.",
            "after_or_equal": "The {attribute} must be a date after or equal to {date}.",
            "alpha": "The {attribute} may only contain letters.",
            "alpha_dash": "The {attribute} may only contain letters, numbers, and dashes.",
            "alpha_num": "The {attribute} may only contain letters and numbers.",
            "array": "The {attribute} must be an array.",
            "before": "The {attribute} must be a date before {date}.",
            "before_or_equal": "The {attribute} must be a date before or equal to {date}.",
            "between": {
                "numeric": "The {attribute} must be between {min} and {max}.",
                "file": "The {attribute} must be between {min} and {max} kilobytes.",
                "string": "The {attribute} must be between {min} and {max} characters.",
                "array": "The {attribute} must have between {min} and {max} items."
            },
            "boolean": "The {attribute} field must be true or false.",
            "confirmed": "The {attribute} confirmation does not match.",
            "date": "The {attribute} is not a valid date.",
            "date_format": "The {attribute} does not match the format {format}.",
            "different": "The {attribute} and {other} must be different.",
            "digits": "The {attribute} must be {digits} digits.",
            "digits_between": "The {attribute} must be between {min} and {max} digits.",
            "dimensions": "The {attribute} has invalid image dimensions.",
            "distinct": "The {attribute} field has a duplicate value.",
            "email": "The {attribute} must be a valid email address.",
            "exists": "The selected {attribute} is invalid.",
            "file": "The {attribute} must be a file.",
            "filled": "The {attribute} field must have a value.",
            "image": "The {attribute} must be an image.",
            "in": "The selected {attribute} is invalid.",
            "in_array": "The {attribute} field does not exist in {other}.",
            "integer": "The {attribute} must be an integer.",
            "ip": "The {attribute} must be a valid IP address.",
            "ipv4": "The {attribute} must be a valid IPv4 address.",
            "ipv6": "The {attribute} must be a valid IPv6 address.",
            "json": "The {attribute} must be a valid JSON string.",
            "max": {
                "numeric": "The {attribute} may not be greater than {max}.",
                "file": "The {attribute} may not be greater than {max} kilobytes.",
                "string": "The {attribute} may not be greater than {max} characters.",
                "array": "The {attribute} may not have more than {max} items."
            },
            "mimes": "The {attribute} must be a file of type: {values}.",
            "mimetypes": "The {attribute} must be a file of type: {values}.",
            "min": {
                "numeric": "The {attribute} must be at least {min}.",
                "file": "The {attribute} must be at least {min} kilobytes.",
                "string": "The {attribute} must be at least {min} characters.",
                "array": "The {attribute} must have at least {min} items."
            },
            "not_in": "The selected {attribute} is invalid.",
            "not_regex": "The {attribute} format is invalid.",
            "numeric": "The {attribute} must be a number.",
            "present": "The {attribute} field must be present.",
            "regex": "The {attribute} format is invalid.",
            "required": "The {attribute} field is required.",
            "required_if": "The {attribute} field is required when {other} is {value}.",
            "required_unless": "The {attribute} field is required unless {other} is in {values}.",
            "required_with": "The {attribute} field is required when {values} is present.",
            "required_with_all": "The {attribute} field is required when {values} is present.",
            "required_without": "The {attribute} field is required when {values} is not present.",
            "required_without_all": "The {attribute} field is required when none of {values} are present.",
            "same": "The {attribute} and {other} must match.",
            "size": {
                "numeric": "The {attribute} must be {size}.",
                "file": "The {attribute} must be {size} kilobytes.",
                "string": "The {attribute} must be {size} characters.",
                "array": "The {attribute} must contain {size} items."
            },
            "string": "The {attribute} must be a string.",
            "timezone": "The {attribute} must be a valid zone.",
            "unique": "The {attribute} has already been taken.",
            "uploaded": "The {attribute} failed to upload.",
            "url": "The {attribute} format is invalid.",
            "custom": {
                "attribute-name": {
                    "rule-name": "custom-message"
                }
            },
            "attributes": []
        },
        "emails": {
            "invitation": {
                "subject": "Velkommen til {name}"
            }
        },
        "categories": {
            "singular": "Category",
            "plural": "Categories",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description"
            }
        },
        "beacons": {
            "singular": "Beacon",
            "plural": "Beacons",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "eddystone_uid": "Eddystone UID",
                "eddystone_url": "Eddystone URL",
                "eddystone_tlm": "Eddystone TLM",
                "eddystone_eid": "Eddystone EID",
                "proximity_uuid": "Proximity UUID",
                "major": "Major",
                "minor": "Minor",
                "lat": "Latitude",
                "lng": "Longitude",
                "floor_id": "Floor ID",
                "category": "Category",
                "content": "Content",
                "map": "Map",
                "tags": "Tags"
            }
        },
        "general": {
            "yes": "Yes",
            "no": "No",
            "confirm": "Are you sure?",
            "details": "Details",
            "meta": "Meta",
            "prepositions": {
                "at": "at",
                "of": "of",
                "by": "by"
            },
            "attributes": {
                "created_by": "Created by",
                "created_at": "Created at",
                "updated_at": "Updated at",
                "deleted_at": "Deleted at"
            },
            "actions": {
                "create": "Create {name}",
                "read": "Read {name}",
                "update": "Update {name}",
                "delete": "Delete {name}",
                "edit": "Edit {name}",
                "select": "Select {name}",
                "add": "Add {name}",
                "show": "Show {name}",
                "apply": "Apply",
                "detach": "Detach {name}",
                "cancel": "Cancel",
                "confirm": "Confirm"
            }
        },
        "pois": {
            "singular": "Point of interest",
            "plural": "Points of interest",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "image": "Image",
                "type": "Type",
                "color": "Color",
                "category": "Category",
                "tags": "Tags"
            }
        }
    }
}
