module.exports = {
  plugins: [
    require('autoprefixer')({
      grid: "autoplace",
    }),
    require('postcss-object-fit-images'),
    require('postcss-viewport-height-correction')
  ]
}