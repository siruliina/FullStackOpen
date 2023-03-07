sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST 	https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP Status Code 201 created
    deactivate server