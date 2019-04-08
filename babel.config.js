module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "component",
      {
        "libraryName": "element-ui",
        "style": true
      }
    ]
  ]
}
