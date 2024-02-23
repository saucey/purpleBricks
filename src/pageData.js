const pageJsonData = `{
  "pages": [
    {
      "title": "What are you reporting?",
      "id": 1,
      "nextId": 2,
      "options": [
        {
          "label": "Missing or incorrect printed information, for example timetables",
          "name": "reporting"
        },
        {
          "label": "A problem with an electronic display or audio",
          "name": "reporting"
        },
        {
          "label": "A fault with a bus shelter",
          "name": "reporting"
        },
        {
          "label": "A fault with a bus stop pole",
          "name": "reporting"
        },
        {
          "label": "A problem at a Park and Ride site",
          "name": "reporting"
        }
      ]
    },
    {
      "title": "Where is the incorrect information?",
      "id": 2,
      "nextId": 3,
      "info": "We are only responsible for bus stops and Park and Ride sites in the West Midlands. If you live outside this area <a href=\"#\">report the issue to your local council.</a>",
      "options": [
        {
          "label": "Town or area * <br /> For example, Halesowen",
          "name": "town"
        },
        {
          "label": "Street name *",
          "name": "street"
        },
        {
          "label": "Direction of travel <br /> For example, towwars Birmingham",
          "name": "direction"
        },
        {
          "label": "Bus shelter or pole number",
          "name": "number"
        }
      ]
    },
    {
      "title": "What's wrong with the printed information?",
      "id": 3,
      "nextId": 4,
      "options": [
        {
          "label": "Details of the issue",
          "name": "details"
        }
      ]
    },
    {
      "title": "What is your name?",
      "id": 4,
      "nextId": 5,
      "options": [
        {
          "label": "First name",
          "name": "firstName"
        },
        {
          "label": "Last name",
          "name": "lastName"
        }
      ]
    },
    {
      "title": "What are your contact details?",
      "id": 5,
      "options": [
        {
          "label": "Email address \n For example, name@example.com",
          "name": "email"
        },
        {
          "label": "Phone number \n For exmple, 07700900457",
          "name": "phone"
        }
      ]
    }
  ]
}`;

export default pageJsonData
