export default {
    "da": {
        "errors": {
            "401": {
                "title": "Unauthenticated - 401",
                "description": "",
                "link_text": "Go to Dashboard"
            },
            "403": {
                "title": "Unauthorized - 403",
                "description": "You do not possess the necessary permissions to access the requested resource. Contact the system\n                    administrator if you need access to this particular page.",
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
                "name": "Navn",
                "identifier": "Identifier",
                "status": "Status",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "menu_items": {
            "singular": "Menu Item",
            "plural": "Menu Items",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "order": "Order",
                "shown": "Shown",
                "poi": "Poi",
                "location": "Location",
                "tag": "Tag",
                "category": "Kategori"
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
            "singular": "Armatur",
            "plural": "Armaturer",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse",
                "image": "Billede",
                "image_width": "Bredde",
                "image_height": "Højde",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "folders": {
            "singular": "Folder",
            "plural": "Foldere",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "auth": {
            "failed": "These credentials do not match our records.",
            "throttle": "Too many login attempts. Please try again in {seconds} seconds."
        },
        "roles": {
            "singular": "Rolle",
            "plural": "Roller",
            "attributes": {
                "id": "ID",
                "name": "Navn"
            },
            "permissions": "Role Permissions"
        },
        "tokens": {
            "singular": "Token",
            "plural": "Tokens",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "token": "Token",
                "role": "Rolle"
            }
        },
        "templates": {
            "singular": "Skabelon",
            "plural": "SKabeloner",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse",
                "activated": "Activated",
                "content": "Content",
                "hook": "Hook",
                "layout": "Layout",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "floors": {
            "singular": "Floor",
            "plural": "Floors",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "level": "Niveau",
                "place_id": "Place ID"
            },
            "show": {
                "edit": "Edit Building",
                "floors": "Floors at",
                "new_floor": "Add new Floor",
                "map_plan": "Map Plan",
                "pois": "Points of Interest",
                "edit_floor": "Edit Floor",
                "name": "Navn",
                "creator": "Creator",
                "actions": "Actions"
            },
            "upsert": {
                "delete": "Delete Building",
                "create": "Create Building",
                "details": "Building Details",
                "name": "Navn"
            }
        },
        "pagination": {
            "previous": "&laquo; Previous",
            "next": "Next &raquo;"
        },
        "buildings": {
            "singular": "Bygning",
            "plural": "Bygninger",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "image": "Billede",
                "menu": "Menu",
                "place_id": "Place ID"
            },
            "map_plan": "Map Plan"
        },
        "locations": {
            "singular": "Location",
            "plural": "Locations",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "type": "Type",
                "zoom_from": "Zoom fra",
                "zoom_to": "Zoom til",
                "title": "Titel",
                "subtitle": "Subtitel",
                "image": "Billede",
                "description": "Beskrivelse",
                "contact_name": "Navn",
                "company": "Virksomhed",
                "address": "Adresse",
                "city": "By",
                "postcode": "Postnummer",
                "phone": "Telefon",
                "email": "Email",
                "search_activated": "Search Activated",
                "search_text": "Search Text",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "skins": {
            "singular": "Skin",
            "plural": "Skins",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "file": "File",
                "mobile": "Mobile",
                "tablet": "Tablet",
                "desktop": "Desktop",
                "valid": "Valid"
            }
        },
        "menus": {
            "singular": "Menu",
            "plural": "Menus",
            "attributes": {
                "id": "ID",
                "name": "Navn"
            }
        },
        "users": {
            "singular": "Bruger",
            "plural": "Brugere",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "email": "Email",
                "avatar": "Avatar",
                "locale": "Sprog",
                "password": "Password",
                "password_confirmation": "Bekræft password",
                "activated": "Aktiveret",
                "remember_token": "Remember Token",
                "role": "Rolle",
                "description": "Beskrivelse",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "menu": {
            "dashboard": "Dashboard",
            "map": "Kort",
            "places": "Steder",
            "components": "Komponenter",
            "menus": "Menus",
            "beacons": "Beacons",
            "pois": "Points of Interest",
            "fixtures": "Armaturer",
            "containers": "Content",
            "locations": "Locations",
            "user_management": "Brugerstyring",
            "activities": "Aktiviteter",
            "users": "Brugere",
            "roles": "Roller",
            "tokens": "API Tokens",
            "settings": "Indstillinger",
            "categories": "Kategorier",
            "tags": "Tags",
            "searchables": "Searchables",
            "skins": "Skins",
            "map-settings": "Map Settings",
            "beacon_providers": "Beacon Providers",
            "email_layouts": "Email Layouts",
            "email_templates": "Email Templates",
            "account": "Min profil",
            "profile": "Profil",
            "log_out": "Log ud"
        },
        "structures": {
            "singular": "Structure",
            "plural": "Structures",
            "attributes": {
                "id": "ID",
                "name": "Navn"
            }
        },
        "containers": {
            "singular": "Content",
            "plural": "Contents",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse",
                "folders_enabled": "Folders enabled",
                "mobile_skin": "Mobile Skin",
                "tablet_skin": "Tablet Skin",
                "desktop_skin": "Desktop Skin",
                "folders": "Folders",
                "category": "Kategori",
                "tags": "Tags",
                "beacons": "Beacons"
            }
        },
        "components": {
            "singular": "Kortkomponent",
            "plural": "Kortkomponenter",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "type": "Type",
                "shape": "Shape",
                "description": "Beskrivelse",
                "stroke": "Stroke",
                "stroke_type": "Type",
                "stroke_color": "Color",
                "stroke_width": "Bredde",
                "stroke_opacity": "Opacity",
                "fill": "Fill",
                "fill_color": "Color",
                "fill_opacity": "Opacity",
                "image": "Billede",
                "image_width": "Bredde",
                "image_height": "Højde",
                "category": "Kategori",
                "tags": "Tags"
            }
        },
        "places": {
            "singular": "Place",
            "plural": "Places",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "address": "Adresse",
                "postcode": "Postnummer",
                "city": "By",
                "image": "Billede",
                "lat": "Breddegrad",
                "lng": "Længdegrad",
                "activated": "Aktiveret",
                "menu": "Menu",
                "category": "Kategori",
                "tags": "Tags"
            },
            "location": "Place location"
        },
        "tags": {
            "singular": "Tag",
            "plural": "Tags",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse"
            }
        },
        "activities": {
            "singular": "Aktivitet",
            "plural": "Aktiviteter",
            "attributes": {
                "id": "ID",
                "name": "Navn"
            }
        },
        "profile": {
            "title": "Min profil",
            "name": "Navn",
            "email": "Email",
            "locale": "Sprog",
            "password": "Password",
            "role": "Rolle"
        },
        "layouts": {
            "singular": "Layout",
            "plural": "Layouts",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse",
                "content": "Content",
                "category": "Kategori",
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
            "singular": "Kategori",
            "plural": "Kategorier",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse"
            }
        },
        "beacons": {
            "singular": "Beacon",
            "plural": "Beacons",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "identifier": "Identifier",
                "description": "Beskrivelse",
                "namespace": "Namespace",
                "instance_id": "Instance ID",
                "url": "URL",
                "proximity_uuid": "Proximity UUID",
                "major": "Major",
                "minor": "Minor",
                "lat": "Breddegrad",
                "lng": "Længdegrad",
                "floor_id": "Floor ID",
                "category": "Kategori",
                "content": "Content",
                "map": "Map",
                "tags": "Tags"
            }
        },
        "beacon-providers": {
            "singular": "Beacon Provider",
            "plural": "Beacon Providers",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "type": "Type"
            }
        },
        "general": {
            "yes": "Ja",
            "no": "Nej",
            "confirm": "Er du sikker?",
            "details": "Detaljer",
            "meta": "Meta",
            "prepositions": {
                "at": "at",
                "of": "of",
                "by": "by"
            },
            "attributes": {
                "created_by": "Oprettet af",
                "created_at": "Oprettet kl.",
                "updated_at": "Opdateret kl.",
                "deleted_at": "Slettet kl."
            },
            "actions": {
                "create": "Opret {name}",
                "read": "Læs {name}",
                "update": "Opdater {name}",
                "delete": "Slet {name}",
                "edit": "Ret {name}",
                "select": "Vælg {name}",
                "add": "Tilføj {name}",
                "show": "Vis {name}",
                "apply": "Apply",
                "detach": "Detach {name}",
                "cancel": "Annuller",
                "confirm": "bekræft"
            }
        },
        "pois": {
            "singular": "Point of interest",
            "plural": "Points of interest",
            "attributes": {
                "id": "ID",
                "name": "Navn",
                "description": "Beskrivelse",
                "image": "Billede",
                "type": "Type",
                "stroke": "Stroke",
                "stroke_type": "Type",
                "stroke_color": "Color",
                "stroke_width": "Bredde",
                "stroke_opacity": "Opacity",
                "fill": "Fill",
                "fill_color": "Color",
                "fill_opacity": "Opacity",
                "category": "Kategori",
                "tags": "Tags"
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
                "description": "You do not possess the necessary permissions to access the requested resource. Contact the system\n                    administrator if you need access to this particular page.",
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
                "identifier": "Identifier",
                "status": "Status",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "menu_items": {
            "singular": "Menu Item",
            "plural": "Menu Items",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "order": "Order",
                "shown": "Shown",
                "poi": "Poi",
                "location": "Location",
                "tag": "Tag",
                "category": "Category"
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
                "image_width": "Width",
                "image_height": "Height",
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
                "menu": "Menu",
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
                "search_text": "Search Text",
                "category": "Category",
                "tags": "Tags"
            }
        },
        "skins": {
            "singular": "Skin",
            "plural": "Skins",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "file": "File",
                "mobile": "Mobile",
                "tablet": "Tablet",
                "desktop": "Desktop",
                "valid": "Valid"
            }
        },
        "menus": {
            "singular": "Menu",
            "plural": "Menus",
            "attributes": {
                "id": "ID",
                "name": "Name"
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
                "password_confirmation": "Confirm Password",
                "activated": "Activated",
                "remember_token": "Remember Token",
                "role": "Role",
                "description": "Description",
                "category": "Category",
                "tags": "Tags"
            },
            "tabs": {
                "user": "User",
                "taxonomy": "Taxonomy"
            }
        },
        "menu": {
            "dashboard": "Dashboard",
            "map": "Map",
            "places": "Places",
            "components": "Components",
            "menus": "Menus",
            "beacons": "Beacons",
            "pois": "Points of Interest",
            "fixtures": "Fixtures",
            "containers": "Content",
            "locations": "Locations",
            "user_management": "User Management",
            "activities": "Activities",
            "users": "Users",
            "roles": "Roles",
            "tokens": "API Tokens",
            "settings": "Settings",
            "categories": "Categories",
            "tags": "Tags",
            "searchables": "Searchables",
            "skins": "Skins",
            "map-settings": "Map Settings",
            "beacon_providers": "Beacon Providers",
            "email_layouts": "Email Layouts",
            "email_templates": "Email Templates",
            "account": "My Account",
            "profile": "Profile",
            "log_out": "Log out"
        },
        "structures": {
            "singular": "Structure",
            "plural": "Structures",
            "attributes": {
                "id": "ID",
                "name": "Name"
            }
        },
        "containers": {
            "singular": "Content",
            "plural": "Contents",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "description": "Description",
                "folders_enabled": "Folders enabled",
                "mobile_skin": "Mobile Skin",
                "tablet_skin": "Tablet Skin",
                "desktop_skin": "Desktop Skin",
                "folders": "Folders",
                "category": "Category",
                "tags": "Tags",
                "beacons": "Beacons"
            }
        },
        "components": {
            "singular": "Map Component",
            "plural": "Map Components",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "type": "Type",
                "shape": "Shape",
                "description": "Description",
                "stroke": "Stroke",
                "stroke_type": "Type",
                "stroke_color": "Color",
                "stroke_width": "Width",
                "stroke_opacity": "Opacity",
                "fill": "Fill",
                "fill_color": "Color",
                "fill_opacity": "Opacity",
                "image": "Image",
                "image_width": "Width",
                "image_height": "Height",
                "category": "Category",
                "tags": "Tags"
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
                "menu": "Menu",
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
        "activities": {
            "singular": "Activity",
            "plural": "Activities",
            "attributes": {
                "id": "ID",
                "name": "Name"
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
                "identifier": "Identifier",
                "description": "Description",
                "namespace": "Namespace",
                "instance_id": "Instance ID",
                "url": "URL",
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
        "beacon-providers": {
            "singular": "Beacon Provider",
            "plural": "Beacon Providers",
            "attributes": {
                "id": "ID",
                "name": "Name",
                "type": "Type"
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
                "stroke": "Stroke",
                "stroke_type": "Type",
                "stroke_color": "Color",
                "stroke_width": "Width",
                "stroke_opacity": "Opacity",
                "fill": "Fill",
                "fill_color": "Color",
                "fill_opacity": "Opacity",
                "category": "Category",
                "tags": "Tags"
            }
        }
    }
}
