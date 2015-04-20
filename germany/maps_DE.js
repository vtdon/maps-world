var app = angular.module('mapApp', []);

app.controller('mapControl', function($scope, $timeout) {
		var resizeMap = function() {
				var w = parseInt( d3.select("svg").attr("width") );
				var h = parseInt( d3.select("svg").attr("height") );
				if (w == 750) return;

				d3.select("svg")
					.attr("width", 750)
					.attr("height", 750)
					.attr("viewBox", "0 0 " + w + " " + h);
		};

		var zoomInit = function() {
				d3.select("g")
					.attr("transform", "translate(" + 0 + "," + 0 + ")")
					.call(d3.behavior.zoom()
							  .scaleExtent([1, 10])
							  .on("zoom", $scope.zoomMap));
		};

		var zoomMap = function() {
				d3.select("g")
					.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
		};

		$scope.resizeMap = resizeMap;
		$scope.zoomInit = zoomInit;
		$scope.zoomMap = zoomMap;
		$scope.mapdata = {};
		$scope.mapdata.title = "GERMANY";
		$timeout( function() {	
				$scope.resizeMap(); $scope.zoomInit();
		}, 500 );
});

app.directive('maps', function ($parse) {
		return {
				restrict:	'EA',
				replace:	true,
				link: function (scope, element, attrs) {
						if (attrs.data == "1")	{
                                scope.url = "../data/germany_map.svg";
								d3.xml(scope.url, "image/svg+xml", function(xml) {
										document.body.appendChild(xml.documentElement);
								})
						}
				}}
		});

