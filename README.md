# Gzippalo

A small wrapper around nodejs zlib and [glob](https://www.npmjs.com/package/glob) for gzipping the files

Installation

```
yarn add  gzippalo --dev
```

Usage:

```javascript
gzippalo({
  pattern: '*.js?(.map)',
  globOptions: {
    cwd: `${__dirname}`,
  },
});
```

Options Types:

```typescript
interface IOptions {
  globOptions: glob.IOptions;
  pattern?: string;
  updateInline?: boolean;
  destination?: string;
}
```

Note: glob.IOptions is from [@types/glob](https://www.npmjs.com/package/@types/glob)

globOptions takes all the parameters, which are accepted by [glob](https://www.npmjs.com/package/glob)

### Pending:

Add support createGzip option forwarding

https://nodejs.org/api/zlib.html#zlib_class_options
