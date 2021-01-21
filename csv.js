const csv = require('csv');
const fs = require('fs');

fs.readFile("./2018movies.csv", function (err, data) {
  csv.parse(data.toString(), function (err, output) {
    var cleaned = output.map(function (value, index) {
      if (index !== 0) {
        var indexes = [2, 6, 8];
        indexes.forEach(function (inva) {
          value[inva] = JSON.parse(value[inva]).join(" ");
        })
      }
      return value;
    });
    csv.stringify(cleaned, function (err, odie) {
      fs.writeFile("abc.csv", odie, () => { });
    })
  });
});
