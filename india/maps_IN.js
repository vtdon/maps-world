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
		$scope.mapdata.title = "INDIA";
		$timeout( function(){ 
				$scope.resizeMap; $scope.zoomInit();
	   	}, 500);
});

app.directive('maps', function ($parse) {
		return {
				restrict:	'EA',
				replace:	true,
				link: function (scope, element, attrs) {
						if (attrs.data == "2")	{
                                scope.url = "../data/india_map.json";
								var width = 750, height = 750;
								var projection = d3.geo.conicConformal()
													.scale(1600)
													.center([108, 20])
													.rotate([0, 45]);
								var path = d3.geo.path().projection(projection);

								d3.json(scope.url, function(error, topology) {
										d3.select("body")
											.append("svg")
											.attr("width", width)
											.attr("height", height)
											.append("g")
											.selectAll("path")
											.data(topojson.feature(topology, 
													   topology.objects.india_regions_1).features)
										   .enter().append("path")
										   .attr("d", path)
										   .attr("class", function(a) { return "state " + a.properties.NAME_1; })
								})
						}
				}}
		});

