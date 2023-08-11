var m_arrFilters = new Array ();
var m_arrEmailNodes = new Array ();
var m_arrInfo	= new Array ();

function onload_102510601aa ()
{
	Constructor_102510601aa ();
	init_102510601aa ();
}

function unload_102510601aa ()
{
	UDModule.COMP.closeWindow ();
	window.opener.resetRowColor_102510601a ();
}

function init_102510601aa ()
{
	UDModule.PROJ.loadDefaultTheme ();
	
	var oURL = unescape (window.location.href);
	var arrURL = oURL.split ("?");
    m_arrFilters = arrURL [1].split (UDModule.Gk_DATA_SEP);
    
    UDModule.COMP.replaceDynamicText ("tdNewEdit", m_arrHeaders[iH_New]);
    UDModule.COMP.setFocus_DD ("cbDepartmentsEx");	
    
    initData_102510601aa ();
    if (getSAUserId_102510601aa () > 0)
    {
    	UDModule.COMP.replaceDynamicText ("tdNewEdit", m_arrHeaders[iH_Edit]);
    	showUserInfo_102510601aa ();
    }
    
}

function initData_102510601aa ()
{
	var xmlDoc = getProcessRequest_102510601aa (getInitParam_102510601aa ());
	if (UDModule.PROJ.isValidStatus (xmlDoc))
	{
		if (isValidStatus_T21_102510601aa (xmlDoc))
		{
			UDModule.PROJ.setFunction_PM (xmlDoc);
			
			var oVisibility = (UDModule.PROJ.isFunction_PM (kFN_Update)) ? "visible" : "hidden";
		    UDModule.COMP.setVisibility ("btnSubmit", oVisibility);
			
		    fillDepartmentsEx_102510601aa (xmlDoc);
			fillUserGroups_102510601aa (xmlDoc);
		}
	}
}

function fillDepartmentsEx_102510601aa (xmlDoc)
{
    var nodeList = xmlDoc.getElementsByTagName (kSR_AA_Departments);
    UDModule.COMP.fillDropDown (nodeList, "cbDepartmentsEx", 1, 0);
}

function fillUserGroups_102510601aa (xmlDoc)
{
    var nodeList = xmlDoc.getElementsByTagName (kSR_AA_UserGroups);
    UDModule.COMP.fillDropDown (nodeList, "cbUserGroups", 1, 0);
}

function fillUserNames_102510601aa (xmlDoc)
{
    var nodeList = xmlDoc.getElementsByTagName (kSR_AA_UserInfo);
    UDModule.COMP.fillDropDown (nodeList, "cbUserNames", 1, 0);
    
    storeEmails_102510601aa (nodeList);
}

function fillEmail_102510601aa ()
{
	UDModule.COMP.getElement ("txtEmail").value	= getUserEmail_102510601aa ();
}

function showUserInfo_102510601aa ()
{
	m_arrInfo = window.opener.getUserNode_102510601a (getSAUserId_102510601aa ());
	var oCCEmail = (m_arrInfo [iEmailCC] == "" ? "-" : 	m_arrInfo [iEmailCC]);
	
	UDModule.COMP.setVisibility ("spnReqUserGroup", "hidden");
	UDModule.COMP.setVisibility ("spnReqUserName", "hidden");
	
	UDModule.COMP.getElement ("cbDepartmentsEx").value = m_arrInfo [iDepartmentId];	
	
	UDModule.COMP.replaceDynamicText ("tdUserGroup", m_arrInfo [iGroupName]);	
	UDModule.COMP.replaceDynamicText ("tdUserName", m_arrInfo [iUserName]);
	
	UDModule.COMP.getElement ("txtEmail").value = m_arrInfo [iEmail];
	UDModule.COMP.getElement ("txtCCEmail").value = oCCEmail;
}

function getUserEmail_102510601aa ()
{
	var oEmail = "";
	for (var nIndex = 0; nIndex < m_arrEmailNodes.length; nIndex++)
    {
		var arrInfo = m_arrEmailNodes [nIndex];
		var nUserId = parseInt (arrInfo [iUI_UserId]);
		
		if (nUserId == getUserId_102510601aa ())
		{
			oEmail = arrInfo [iUI_Email];
			break;
		}
	}
	
	return oEmail;
}

function getSAUserId_102510601aa ()
{
	return m_arrFilters [0];
}

function getCompanyUnitId_102510601aa ()
{
	return m_arrFilters [1];
}

function getDepartmentId_102510601aa ()
{
	return parseInt (UDModule.COMP.getElement ("cbDepartmentsEx").value);
}

function getUserGroupId_102510601aa ()
{
	var nGroupId = m_arrInfo [iGroupId];
	
	if (getSAUserId_102510601aa () == 0)
		nGroupId = parseInt (UDModule.COMP.getElement ("cbUserGroups").value);
	
	return nGroupId;
}

function getUserId_102510601aa ()
{
	var nUserId = m_arrInfo [iUserId];
	
	if (getSAUserId_102510601aa () == 0)
		nUserId = parseInt (UDModule.COMP.getElement ("cbUserNames").value);
	
	return nUserId;
}

function getEmail_102510601aa ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtEmail").value);
}

function getEmailPassword_102510601aa ()
{
	return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtPassword").value);
}

function getCCEmail_102510601aa ()
{
    return UDModule.VAL.formatText (UDModule.COMP.getElement ("txtCCEmail").value);
}

function storeEmails_102510601aa (nodeList)
{
	var arrNodes = UDModule.DOM.convertNodesToArray (nodeList);
	m_arrEmailNodes = arrNodes.slice (0);
}

function getProcessRequest_102510601aa (oParam)
{
	return window.opener.getProcessRequest_102510601a (oParam);
}

function isValidEmail_102510601aa ()
{
	var bStatus = false;
	
	var email = getEmail_102510601aa ();
	var pattern = /\S+@\S+\.\S+/;
    if (pattern.test (email) == true)
    	bStatus = true;
    else
    	bStatus = false;	
	
	return bStatus;
}

function isValidData_102510601aa ()
{
	var bStatus = false;
	
	if (getDepartmentId_102510601aa () == 0)
	{
		alert (m_arrMessages [iM_Department]);
		UDModule.COMP.setFocus_DD ("cbDepartmentsEx");
	}
	else if (getUserGroupId_102510601aa () == 0)
	{
		alert (m_arrMessages [iM_UserGroup]);
		UDModule.COMP.setFocus_DD ("cbUserGroups");
	}
	else if (getUserId_102510601aa () == 0)
	{
		alert (m_arrMessages [iM_UserName]);
		UDModule.COMP.setFocus_DD ("cbUserNames");
	}
	else if (getEmail_102510601aa () == "")
	{
		alert (m_arrMessages [iM_Email]);
		UDModule.COMP.setFocus ("txtEmail");
	}
	else if (isValidEmail_102510601aa () == false)
	{
		alert (m_arrMessages [iM_ValidEmail]);
		UDModule.COMP.setFocus_DD ("txtEmail");	
	}
	else if (getEmailPassword_102510601aa () == "")
	{
		alert (m_arrMessages [iM_Password]);
		UDModule.COMP.setFocus ("txtPassword");
	}
	else
		bStatus = true;
	
	return bStatus;	
}

function resetPopUpValues_102510601aa ()
{
	if (getSAUserId_102510601aa () == 0)
	{
		UDModule.COMP.getElement ("cbUserGroups").value	= "0";	
		UDModule.COMP.getElement ("cbUserNames").value = "0";
		UDModule.COMP.getElement ("txtEmail").value	= "";
		UDModule.COMP.getElement ("txtPassword").value	= "";
		UDModule.COMP.getElement ("txtCCEmail").value	= "";
		
		UDModule.COMP.setFocus_DD ("cbUserGroups");
	}
	else
		window.close ();
}

function clearValues_102510601aa ()
{
	if (getSAUserId_102510601aa () == 0)
	{
		UDModule.COMP.getElement ("cbUserGroups").value	= "0";	
		UDModule.COMP.getElement ("cbUserNames").value = "0";
	}
	
	UDModule.COMP.getElement ("cbDepartmentsEx").value = "0";	
	UDModule.COMP.getElement ("txtEmail").value	= "";
	UDModule.COMP.getElement ("txtPassword").value	= "";
	UDModule.COMP.getElement ("txtCCEmail").value	= "";
	
	UDModule.COMP.setFocus_DD ("cbDepartmentsEx");
}
