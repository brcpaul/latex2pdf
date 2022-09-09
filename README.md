# latex2pdf

latex2pdf is a Nodejs module for converting latex files to pdf files.

## Installation

```bash
npm install latex2pdf
```

## Usage

```javascript
const latex2pdf = require("latex2pdf");

latex2pdf.convert("test.tex",(err)=>{
    if(err) console.log(err);
    console.log("Done !");
})

//Specify an output directory and filename, a timeout and whether to log debugging messages or not
latex2pdf.convert("test.tex",{output:"/dir/name.pdf",timeout:2000,debug:false},(err)=>{
    if(err) console.log(err);
    console.log("Done !");
})
```
## License
[MIT](https://choosealicense.com/licenses/mit/)
