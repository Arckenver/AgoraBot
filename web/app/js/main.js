/**
 *
 */

require('../less/main.less');

import Client from './client.js'

window.onload = function() {
	//let client = new Client("ws://localhost:8000")

	setTimeout(() => {
		$("<canvas></canvas>")
			.appendTo("#chartLoading")
			.ready(() => {
				$("#chartLoading").remove()
				let chart = new Chart(
					document.getElementById("chart"),
					{
						type: 'pie',
						data: {
							labels: [
								"Move forward",
								"Turn right",
								"Turn left",
								"Turn right backward",
								"Turn left backward"
							],
							datasets: [
								{
									data: [1, 1, 1, 1, 1],
									backgroundColor: [
										"#3498DB",
										"#F1C40F",
										"#E74C3C",
										"#2ECC71",
										"#9B59B6"
									],
									hoverBackgroundColor: [
										"#2980B9",
										"#F39C12",
										"#C0392B",
										"#27AE60",
										"#8E44AD"
									]
								}
							]
						},
						options: {}
					}
				)
			}
		)
	}, 2000)
}
