# Hidden Trails: Level JSON Schema Specification

This document defines the data-driven JSON format for creating levels and biomes in **Hidden Trails: Scavenger Hunt**.

## Schema Overview

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "LevelData",
  "type": "object",
  "required": [
    "id",
    "levelNumber",
    "title",
    "biome",
    "subtitle",
    "description",
    "sceneWidth",
    "sceneHeight",
    "targets",
    "interactiveObjects",
    "ambientNPCs"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique level identifier (e.g. 'village', 'forest')"
    },
    "levelNumber": {
      "type": "integer",
      "description": "1-indexed level sequence number"
    },
    "title": {
      "type": "string",
      "description": "Display name of the level"
    },
    "biome": {
      "type": "string",
      "enum": ["village", "forest", "mountain", "desert", "harbor"],
      "description": "Biome category controlling default background and generative ambient audio"
    },
    "subtitle": {
      "type": "string",
      "description": "Short poetic tagline for the level"
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the area"
    },
    "sceneWidth": {
      "type": "number",
      "default": 2400,
      "description": "Virtual coordinate width of the scene canvas (typically 3x standard viewport)"
    },
    "sceneHeight": {
      "type": "number",
      "default": 1600,
      "description": "Virtual coordinate height of the scene canvas"
    },
    "targets": {
      "type": "array",
      "items": { "$ref": "#/definitions/TargetItem" }
    },
    "interactiveObjects": {
      "type": "array",
      "items": { "$ref": "#/definitions/InteractiveObject" }
    },
    "ambientNPCs": {
      "type": "array",
      "items": { "$ref": "#/definitions/AmbientNPC" }
    }
  },
  "definitions": {
    "Point": {
      "type": "object",
      "required": ["x", "y"],
      "properties": {
        "x": { "type": "number" },
        "y": { "type": "number" }
      }
    },
    "TargetItem": {
      "type": "object",
      "required": ["id", "name", "clue", "category", "iconType", "accentColor", "x", "y", "width", "height"],
      "properties": {
        "id": { "type": "string", "description": "Unique target ID (e.g. 'target-fisherman')" },
        "name": { "type": "string", "description": "Display name of target" },
        "clue": { "type": "string", "description": "Riddle or location hint shown to player" },
        "category": { "type": "string", "enum": ["character", "animal", "object", "nature"] },
        "iconType": { "type": "string", "description": "Asset key used to render the SVG doodle icon" },
        "accentColor": { "type": "string", "description": "Vibrant watercolor hex color revealed upon discovery" },
        "x": { "type": "number" },
        "y": { "type": "number" },
        "width": { "type": "number" },
        "height": { "type": "number" },
        "hiddenBehindId": {
          "type": "string",
          "description": "Optional ID of an interactive object that must be tapped before this target appears"
        },
        "isMoving": { "type": "boolean" },
        "path": {
          "type": "array",
          "items": { "$ref": "#/definitions/Point" },
          "description": "Waypoint path for walking/moving targets"
        },
        "moveSpeed": { "type": "number", "default": 1.2 }
      }
    },
    "InteractiveObject": {
      "type": "object",
      "required": ["id", "name", "type", "x", "y", "width", "height", "tapAnimation"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "type": {
          "type": "string",
          "enum": ["bush", "tree", "door", "tent", "rock", "manhole", "curtain", "chest", "chimney", "pond", "haystack", "bell", "window", "mailbox", "barrel"]
        },
        "x": { "type": "number" },
        "y": { "type": "number" },
        "width": { "type": "number" },
        "height": { "type": "number" },
        "tapAnimation": {
          "type": "string",
          "enum": ["rustle", "open", "lift", "shake", "slide", "ripple", "spin", "bounce"]
        },
        "revealsTargetId": {
          "type": "string",
          "description": "ID of the target exposed when this object is tapped"
        },
        "interactionSound": {
          "type": "string",
          "enum": ["rustle", "creak", "lift", "splash", "bell", "pop", "found", "tap"]
        }
      }
    },
    "AmbientNPC": {
      "type": "object",
      "required": ["id", "name", "type", "path", "speed"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "type": { "type": "string", "enum": ["villager", "bird", "fish", "car", "cat", "dog", "butterfly", "cloud", "boat"] },
        "path": { "type": "array", "items": { "$ref": "#/definitions/Point" } },
        "speed": { "type": "number" },
        "scale": { "type": "number", "default": 1.0 }
      }
    }
  }
}
```

## Sample Level JSON

Below is a complete, valid sample level definition:

```json
{
  "id": "quiet-farm",
  "levelNumber": 1,
  "title": "Sunny Farmstead",
  "biome": "village",
  "subtitle": "Warm sunshine over the hay bales and vegetable patch",
  "description": "Find the secret tools, friendly animals, and farm fresh goods.",
  "sceneWidth": 2400,
  "sceneHeight": 1600,
  "targets": [
    {
      "id": "target-barn-key",
      "name": "Barn Key",
      "clue": "Hidden behind the red toolshed door.",
      "category": "object",
      "iconType": "golden_key",
      "accentColor": "#eab308",
      "x": 1625,
      "y": 720,
      "width": 42,
      "height": 42,
      "hiddenBehindId": "obj-farm-shed-door"
    },
    {
      "id": "target-farm-dog",
      "name": "Playful Puppy",
      "clue": "Trotting along the wooden fence perimeter.",
      "category": "animal",
      "iconType": "sleeping_cat",
      "accentColor": "#d97706",
      "x": 1840,
      "y": 830,
      "width": 44,
      "height": 36,
      "isMoving": true,
      "moveSpeed": 1.4,
      "path": [
        { "x": 1830, "y": 830 },
        { "x": 2020, "y": 830 },
        { "x": 2240, "y": 830 },
        { "x": 1830, "y": 830 }
      ]
    }
  ],
  "interactiveObjects": [
    {
      "id": "obj-farm-shed-door",
      "name": "Toolshed Door",
      "type": "door",
      "x": 1610,
      "y": 700,
      "width": 60,
      "height": 80,
      "tapAnimation": "open",
      "interactionSound": "creak",
      "revealsTargetId": "target-barn-key"
    },
    {
      "id": "obj-orchard-tree-1",
      "name": "Apple Tree",
      "type": "tree",
      "x": 640,
      "y: 830,
      "width": 110,
      "height": 150,
      "tapAnimation": "shake",
      "interactionSound": "rustle"
    }
  ],
  "ambientNPCs": [
    {
      "id": "npc-bird-1",
      "name": "Barn Swallow",
      "type": "bird",
      "path": [
        { "x": 100, "y": 160 },
        { "x": 1200, "y": 200 },
        { "x": 2300, "y": 180 }
      ],
      "speed": 2.2
    }
  ]
}
```
