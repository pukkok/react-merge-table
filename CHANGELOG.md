# Changelog

## [1.1.1] - 2025-06-11

### Fixed

* Re-published v1.1.0 due to missing build output. This patch includes the proper `dist/` files.

---

## [1.1.0] - 2025-06-11

### Added

* ✨ Support for returning `<td>` or `<th>` directly from `columnRenderers` without additional wrapping.
* ✨ Updated documentation with usage examples for custom cell rendering.

### Changed

* 🔧 Internal `TableCell` logic now detects raw table elements and skips wrapping automatically.

### Fixed

* 🐛 Fixed alignment edge case when rendering multiple contents with custom buttons.

---

## [1.0.0] - 2025-06-01

* 🎉 Initial release of `react-merge-table`.
* Automatic merging of identical values using `$` and `~` symbols.
* Supports `columnRenderers`, `defaultStyle`, `CellValue`/`Row` formats.
* Semantic HTML rendering: `<table>`, `<thead>`, `<tbody>`, `<td>`.
