/**
 *
 */

export default class VoteBtn
{
	constructor(btnSelector)
	{
		this.btnSelector = btnSelector
		this.iconSelector = btnSelector + " > i"
	}

	setState(state)
	{
		$(this.iconSelector).removeClass('fa-paper-plane')
		$(this.iconSelector).removeClass('fa-cog')
		$(this.iconSelector).removeClass('fa-spin')
		$(this.btnSelector).prop("disabled", false)
		switch(state)
		{
			case "default":
				$(this.iconSelector).addClass('fa-paper-plane')
				break
			case "loading":
				$(this.iconSelector).addClass('fa-cog')
				$(this.iconSelector).addClass('fa-spin')
				$(this.btnSelector).prop('disabled', true)
				break
			case "error":
				//$(this.iconSelector).addClass('')
				break
			default:
				throw 'Invalid state for vote button'
		}
	}

	onClick(callback)
	{
		$(this.btnSelector).click(callback)
	}
}
