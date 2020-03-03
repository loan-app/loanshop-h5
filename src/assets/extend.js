String.prototype.cutStr = function(len) {
	if(this.length <= len) return this;
	return this.substr(0, len - 1) + '...';
}

String.prototype.toT8Time = function() {
	return this.replace('.000+08', '').replace('.0Z', '').replace('T', ' ');
}

String.prototype.toDate = function() {
	const arr = this.split(/\D+/);
	if(arr.length < 3) return null;
	for(const i in arr) arr[i] = arr[i] * 1;
	arr[1] = arr[1]*1 - 1;
	return eval(`new Date(${arr.join(',')})`);
}
Date.prototype.format = function(format) {
    var o = {
        "y+": this.getFullYear(),
        "m+": this.getMonth() + 1,
        "d+": this.getDate(), //day
        "x+": '日一二三四五六'.split('')[this.getDay()],
        "H+": this.getHours(),
        "h": (this.getHours()>12?'下午':'上午') + this.getHours()%12,
        "i+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S": this.getMilliseconds()
    }
    for (var k in o) {
        var reg = new RegExp("(" + k + ")");
        if (reg.test(format)) {
            var v = o[k] + '';
//			console.log(RegExp.$1)
            if(RegExp.$1.length<4 && RegExp.$1.length>1 && v.length==1) v = '0'+v;
            format = format.replace(reg, v);
        }
    }
    return format;
}