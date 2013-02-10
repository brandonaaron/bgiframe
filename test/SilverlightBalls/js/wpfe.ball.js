/**
 * @author alex
 * @requires ball.js 
 */
 
/**
 * WPF/e-specific implementation
 * 
 * @param {Object} name
 * @param {Object} x
 * @param {Object} y
 * @param {Object} vx
 * @param {Object} vy
 */
function WPFEBall(host, name, x, y, vx, vy) {
	WPFEBall.baseConstructor.call(this, x, y, vx, vy);
	this._host = host;
	this._name = name;
	this._elem = host.content.findName(name);
	this.move();
}
extend(WPFEBall, Ball);

WPFEBall.prototype.move = function(){
	WPFEBall.base.move.call(this);
	this._elem["canvas.left"] = this._x;
	this._elem["canvas.top"] = this._y;
}

WPFEBall.prototype.clone = function(newName, is_bmp) {
	// oops, wpf/e doesn't support objects cloning nor getting their XAML source!
	// it's just too bad -- I had to paste all XAML right here
	// 
	var newXAML = "";
	if (this._is_bmp && this._is_bmp != undefined) {
		newXAML = '<Canvas xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" x:Name="' + newName + '" Width="54.6667" Height="54.6667" Canvas.Left="0" Canvas.Top="0"><Image Source="assets/ball.png"/></Canvas>';
	} else {
		newXAML = '<Canvas xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" x:Name="' + newName + '" Width="52" Height="52" Canvas.Left="0" Canvas.Top="30"><Path Opacity="0.900000" StrokeThickness="2.000000" Stroke="#ffa6d000" StrokeMiterLimit="1.000000" Fill="#ffcbff00" Data="F1 M 51.000000,26.000000 C 51.000000,39.806641 39.807129,51.000000 26.000000,51.000000 C 12.192871,51.000000 1.000000,39.806641 1.000000,26.000000 C 1.000000,12.193359 12.192871,1.000000 26.000000,1.000000 C 39.807129,1.000000 51.000000,12.193359 51.000000,26.000000 Z"/><Path Opacity="0.740000" Data="F1 M 43.143066,13.087891 C 50.602051,22.888672 49.009766,36.642578 39.590332,43.812500 C 30.170898,50.980469 16.489258,48.842773 9.032715,39.042969 C 1.573242,29.240234 3.166016,15.486328 12.584961,8.316406 C 22.003906,1.149414 35.685547,3.285156 43.143066,13.087891 Z"><Path.Fill><RadialGradientBrush MappingMode="Absolute" GradientOrigin="156.791016,170.453125" Center="156.791016,170.453125" RadiusX="53.626404" RadiusY="53.626404"><RadialGradientBrush.GradientStops><GradientStop Offset="0.000000" Color="#ffffffff"/><GradientStop Offset="0.361685" Color="#fff5f7dd"/><GradientStop Offset="0.415730" Color="#ffebf0bc"/><GradientStop Offset="1.000000" Color="#ffcbff00"/></RadialGradientBrush.GradientStops><RadialGradientBrush.Transform><MatrixTransform Matrix="1.190000,0.165000,-0.165000,-1.281300,-113.414185,241.757843" /></RadialGradientBrush.Transform></RadialGradientBrush></Path.Fill></Path> <Path Fill="#ffffffff" Data="F1 M 23.100586,9.477539 C 24.741699,11.634766 23.116211,15.630859 19.470703,18.404297 C 15.825684,21.178711 11.540039,21.678711 9.899414,19.522461 C 8.258301,17.365234 9.883789,13.369141 13.529297,10.594727 C 17.174316,7.821289 21.459961,7.321289 23.100586,9.477539 Z"/></Canvas>';
	}
	
	var newNode = this._host.content.createFromXaml(newXAML);
	this._elem.getParent().children.add(newNode);
	return new WPFEBall(this._host, newName);
}

