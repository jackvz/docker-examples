var args = process.argv.slice(2);

if (!args.length) {
	console.log('Array or comma separated string of NMAP acceptable hosts expected.')
	return;
}
var nmap = require('node-nmap');

var osandports = new nmap.OsAndPortScan(args[0]);

osandports.on('complete',function(data){
  console.log(data);
});
osandports.on('error', function(error){
  console.log(error);
});

osandports.startScan();
