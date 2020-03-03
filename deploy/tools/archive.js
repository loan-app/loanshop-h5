require('shelljs/global')

var path = require('path')
var fs = require('fs');
var archiver = require('archiver');
var archiveFilePath = path.join(__dirname, '../../dist.zip');
var archive = archiver('zip');
var ora = require('ora')

if (!process.env.NODE_ENV) {
  console.log('请指定打包的环境:NODE_EVN=production(生产环境)');
  return;
}

rm('-rf', archiveFilePath)

var spinner = ora('archiving for ' + process.env.NODE_ENV + '...');
spinner.start()

var output = fs.createWriteStream(archiveFilePath);

output.on('close', function () {
  spinner.stop()
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});


archive.pipe(output);

archive.directory('haojie', true, {date: new Date()});
archive.file('50x.html', {date: new Date()});
archive.file('404.html', {date: new Date()});
// archive.file('index.html','haojie/index.html',{date: new Date()});
archive.file('404.html', { name: 'index.html',date: new Date() })
archive.finalize();
