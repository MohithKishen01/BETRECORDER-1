function pageChanged_102510601a ()
{
    window.location = getPageURL_102510601a ();
}

function companyUnitChanged_102510601a ()
{
	UDModule.COMP.setFocus ("txtUserNameFltr");
	
	UDModule.COMP.setDisplay ("tdUserList", "none");
	UDModule.COMP.closeWindow (m_arrPopups [iW_NewUser]);
}

function departmentChanged_102510601a ()
{
	UDModule.COMP.setDisplay ("tdUserList", "none");
	UDModule.COMP.closeWindow (m_arrPopups [iW_NewUser]);	
	UDModule.COMP.setFocus ("txtUserNameFltr");
	
	searchImgClicked_102510601a ();
}

function searchKeyPressed_102510601a (oEvent)
{
    if (!oEvent)
        oEvent = window.event;
        
    if (oEvent.keyCode == 13)
    	searchImgClicked_102510601a ();
}

function searchImgClicked_102510601a ()
{
	getUserList_102510601a ();
}

function getUserList_102510601a ()
{
	UDModule.COMP.setDisplay ("tdUserList", "none");
	
	if (isValidData_102510601a ())
	{
		var xmlDoc = getProcessRequest_102510601a (getUserListParam_102510601a ());
		if (UDModule.PROJ.isValidStatus (xmlDoc))
		{
			if (isValidStatus_T14_102510601a (xmlDoc))
				buildUserListUI_102510601a (xmlDoc);
		}
	}
}

function userNameClicked_102510601a (nSAUserId)
{
	addUserClicked_102510601a (nSAUserId);
	
	UDModule.TBL.setEditRowColor (m_nSAUserId, nSAUserId);
	m_nSAUserId = nSAUserId;
}

function deleteClicked_102510601a (nSAUserId, nUserId)
{
	if (window.confirm (m_arrMessages [iM_tDelete]))
	{
		var xmlDoc = getProcessRequest_102510601a (getDeleteParam_102510601a (nSAUserId, nUserId));
		if (UDModule.PROJ.isValidStatus (xmlDoc))
		{
			checkTxnPresent_102510601a (xmlDoc, nSAUserId);
			
			if (isValidStatus_T15_102510601a (xmlDoc))			    				
				searchImgClicked_102510601a ();			
		}
	}
}

function addUserClicked_102510601a (nSAUserId)
{
	if (isValidData_102510601a ())
	{
		var oParam = nSAUserId + UDModule.Gk_DATA_SEP;
		oParam += getCompanyUnitId_102510601a ();
		
		var windowStyle = "width=430, height=250, left=620, top=220, status=yes, toolbar=no, " +
	    "menubar=no, location=no, resizable=yes, scrollbars=yes";

		m_arrPopups [iW_NewUser] = 
		    window.open ("../../en/aa_newuser/newuser" + UDModule.PROJ.PageExtension + "?" + oParam, "newuser", windowStyle);
		    
		m_arrPopups [iW_NewUser].focus ();
	}
}
