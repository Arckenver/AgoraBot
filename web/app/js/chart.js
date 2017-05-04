/**
 *
 */

import actions from "./actions"

const initChart = (callback) => {
	$("<canvas></canvas>", {id: "chart"})
		.insertAfter("#chartLoading")
		.ready(() => {
			$("#chartLoading").remove()
			let chart = new Chart(
				$("canvas#chart"),
				{
					type: 'pie',
					data: {
						labels: [
							actions[null],
							actions.MOVE_FORWARD,
							actions.TURN_RIGHT,
							actions.TURN_LEFT,
							actions.TURN_RIGHT_BACKWARD,
							actions.TURN_LEFT_BACKWARD
						],
						datasets: [
							{
								data: [1, 1, 1, 1, 1, 1],
								backgroundColor: [
									"#888888",
									"#3498DB",
									"#F1C40F",
									"#E74C3C",
									"#2ECC71",
									"#9B59B6"
								],
								hoverBackgroundColor: [
									"#787878",
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
			callback(chart)
		}
	)
}

export { initChart }
