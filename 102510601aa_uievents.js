function departmentChanged_102510601aa ()
{
	if (getSAUserId_102510601aa () == 0)
	{
		UDModule.COMP.getElement ("cbUserGroups").value = "0";
		UDModule.COMP.getElement ("cbUserNames").value = "0";
		UDModule.COMP.getElement ("txtEmail").value	= "";
		UDModule.COMP.getElement ("txtPassword").value	= "";
		UDModule.COMP.getElement ("txtCCEmail").value	= "";
		UDModule.COMP.setFocus_DD ("cbUserGroups");
	}
	else
		UDModule.COMP.setFocus_DD ("txtEmail");
	
	if (getDepartmentId_102510601aa () == 0)
		UDModule.COMP.setFocus_DD ("cbDepartmentsEx");
}

function userGroupChanged_102510601aa ()
{
	UDModule.COMP.getElement ("txtEmail").value	= "";
		
	if (getUserGroupId_102510601aa ()== 0)
		UDModule.COMP.setFocus_DD ("cbUserGroups");
	else
		UDModule.COMP.setFocus_DD ("cbUserNames");
	
	var xmlDoc = getProcessRequest_102510601aa (getUserInfoParam_102510601aa ());
	if (UDModule.PROJ.isValidStatus (xmlDoc))
	{
		if (isValidStatus_T22_102510601aa (xmlDoc))
			fillUserNames_102510601aa (xmlDoc);
	}
}

function userNameChanged_102510601aa ()
{
	fillEmail_102510601aa ();
	
	if (getUserId_102510601aa ()== 0)
	{
		UDModule.COMP.getElement ("txtEmail").value	= "";
		UDModule.COMP.setFocus_DD ("cbUserNames");
	}		
	else	
		UDModule.COMP.setFocus_DD ("txtEmail");
}

function submitClicked_102510601aa ()
{
	if (isValidData_102510601aa ())
	{
		if (window.confirm (m_arrMessages [iM_Submit]))
		{
			var xmlDoc = getProcessRequest_102510601aa (getRecordParam_102510601aa ());
			if (UDModule.PROJ.isValidStatus (xmlDoc))
			{
				if (isValidStatus_T23_102510601aa (xmlDoc))                    
	                afterSubmitClicked_102510601aa (); 
			}
		}
	}
}

function afterSubmitClicked_102510601aa ()
{  
	resetPopUpValues_102510601aa ();
	window.opener.searchImgClicked_102510601a ();
}

function clearClicked_102510601aa ()
{
	if (window.confirm (m_arrMessages [iM_Clear]))
		clearValues_102510601aa ();
}
