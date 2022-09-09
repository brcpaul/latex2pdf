"use strict";

var fs = require('fs');
var childProcess = require('child_process');
const path = require('path');

class Latex2Pdf {
    convert(input, { output, timeout, debug }, callback) {
        let outputDir = output?path.parse(output).dir:"output";
        let outputFile = output?path.parse(output).name:path.parse(input).name;
        timeout ||= 60000;
        debug ||= false;
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        var process = childProcess.spawn("pdflatex", ["--jobname",outputFile,"-output-directory", outputDir, input,"FILE"]);
        process.stdout.on("data", (data) => {
            if (debug) {
                console.log(data.toString());
            }
        })
        process.stderr.on("data", (data) => {
            if (debug) {
                console.log(data.toString());
            }
        })
        process.on("exit", (data) => {
            fs.rmSync(path.join(outputDir,outputFile+".aux"));
            fs.rmSync(path.join(outputDir,outputFile+".log"));
            callback(killed ? new Error("Timeout") : null);
        })
        var killed;
        setTimeout(() => {
            killed = true;
            process.kill();
        }, timeout);
    }
}

module.exports = new Latex2Pdf;