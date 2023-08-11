function submitClicked_102510601ba ()
{
	if (isValidData_102510601ba ())
	{
		if (window.confirm (m_arrMessages [iM_Submit]))
		{
			var xmlDoc = getProcessRequest_102510601ba (getRecordParam_102510601ba ());
			if (UDModule.PROJ.isValidStatus (xmlDoc))
			{
				if(isValidStatus_T44_102510601ba (xmlDoc))
				{
					afterSubmitClicked_102510601ba ();
				}
			}
		}
	}
}

function afterSubmitClicked_102510601ba ()
{  
	resetPopUpValues_102510601ba ();
	window.opener.searchImgClicked_102510601b ();
}

