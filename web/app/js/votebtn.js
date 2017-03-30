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
		$(this.btnSelector).removeClass('btn-primary')
		$(this.btnSelector).removeClass('btn-danger')
		switch(state)
		{
			case "default":
				$(this.iconSelector).addClass('fa-paper-plane')
				$(this.btnSelector).addClass('btn-primary')
				break
			case "loading":
				$(this.iconSelector).addClass('fa-cog')
				$(this.iconSelector).addClass('fa-spin')
				$(this.btnSelector).prop('disabled', true)
				$(this.btnSelector).addClass('btn-primary')
				break
			case "error":
				$(this.iconSelector).addClass('fa-ban')
				$(this.btnSelector).prop('disabled', true)
				$(this.btnSelector).addClass('btn-danger')
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
