# 📚 Interactive Book Structure Visualizer

This project, built with [p5.js](https://p5js.org/), is an interactive visualizer for exploring the hierarchical structure of a book described in a JSON format. Users can navigate through chapters and paragraphs by expanding or collapsing nodes with a click.

## ✨ Features

- Tree-like visualization of book contents (titles, chapters, paragraphs)
- Click to expand/collapse nodes
- Highlight nodes on mouse hover

## 📁 Requirements

- [p5.js](https://p5js.org/) library (included via CDN or local import)
- A `book.json` file containing the book structure with fields like `titolo`, `riassunto`, `capitoli`, and `paragrafi`

## 🛠️ JSON Structure

Example of the expected JSON format:

```json
{
  "titolo": "Book Title",
  "riassunto": "General description",
  "capitoli": [
    {
      "titolo": "Chapter 1",
      "riassunto": "Chapter introduction",
      "paragrafi": [
        {
          "titolo": "Paragraph 1.1",
          "riassunto": "Paragraph content"
        }
      ]
    }
  ]
}
