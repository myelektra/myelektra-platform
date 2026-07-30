---
enable: true
badge: "contact"
title: "Ready to transform your revenue?"
description: "Book a discovery session to learn how Myelektra can help you build a structured revenue system."
image: ""
imageAlt: "Contact"
characterImage: ""
characterImageAlt: ""

form:
  emailSubject: "New contact form submission"
  submitButton:
    enable: true
    label: "Send a Message"
  inputs:
    - label: "Full Name"
      placeholder: "Full Name *"
      name: "Full Name"
      required: true
      halfWidth: true
      defaultValue: ""
    - label: "Email Address"
      placeholder: "Email Address *"
      name: "Email Address"
      required: true
      type: "email"
      halfWidth: true
      defaultValue: ""
    - label: "Company"
      placeholder: "Company"
      name: "Company"
      required: false
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: "Subject"
      placeholder: "Subject *"
      name: "Subject"
      required: true
      halfWidth: true
      dropdown:
        type: "select"
        items:
          - label: "Revenue Intelligence"
            value: "Revenue Intelligence"
            selected: false
          - label: "Pipeline Builder"
            value: "Pipeline Builder"
            selected: false
          - label: "Revenue Engine"
            value: "Revenue Engine"
            selected: false
          - label: "AI Sales Transformation"
            value: "AI Sales Transformation"
            selected: false
          - label: "Fractional Revenue Office"
            value: "Fractional Revenue Office"
            selected: false
          - label: "Other"
            value: "Other"
            selected: false
    - label: "Message"
      tag: "textarea"
      placeholder: "Tell us about your revenue goals *"
      name: "Message"
      required: true
      halfWidth: false
      rows: "4"
      defaultValue: ""
    - note: success
      parentClass: "hidden text-sm message success"
      content: "Message sent! We'll get back to you within 24 hours."
    - note: deprecated
      parentClass: "hidden text-sm message error"
      content: "Something went wrong. Please try again."
---
