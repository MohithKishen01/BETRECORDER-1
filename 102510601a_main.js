var m_nSAUserId = -1;
var m_arrPopups = new Array (null, null, null);

function onload_102510601a ()
{
	Constructor_102510601a ();
	init_102510601a ();	
}

function unload_102510601a ()
{
	UDModule.PROJ.closeHelp ();

	for (var nIndex = 0; nIndex < m_arrPopups.length; nIndex++)
		UDModule.COMP.closeWindow (m_arrPopups [nIndex]);
}

function init_102510601a ()
{
    UDModule.PROJ.loadDefaultTheme ();    
    UDModule.COMP.setFocus ("txtUserNameFltr");
    
    initData_102510601a ();
}

function initData_102510601a ()
{
	var xmlDoc = getProcessRequest_102510601a (getInitParam_102510601a ());
	if (UDModule.PROJ.isValidStatus (xmlDoc))
	{
		if (isValidStatus_T11_102510601a (xmlDoc))
		{
			UDModule.PROJ.setFunction_PM (xmlDoc);
			
			fillCompanyUnits_102510601a (xmlDoc);
			fillDepartments_102510601a (xmlDoc);
		}
	}
	
	UDModule.COMP.getElement ("cbPages").value = 0;
}

function fillCompanyUnits_102510601a (xmlDoc)
{
    var nodeList = xmlDoc.getElementsByTagName (kSR_A_CompanyUnits);
    UDModule.COMP.fillDropDown (nodeList, "cbCompanyUnits", 1, 0);

	if (UDModule.COMP.getElement ("cbCompanyUnits").options.length > 1)
		UDModule.COMP.getElement ("cbCompanyUnits").selectedIndex = 1;
}

function fillDepartments_102510601a (xmlDoc)
{
	var nodeList = xmlDoc.getElementsByTagName (kSR_A_Departments);
    UDModule.COMP.fillDropDown (nodeList, "cbDepartments", 1, 0);
}

function getPageURL_102510601a ()
{
    return UDModule.COMP.getElement ("cbPages").value;
}

function getCompanyUnitId_102510601a ()
{
	return parseInt (UDModule.COMP.getElement ("cbCompanyUnits").value);
}

function getDepartmentId_102510601a ()
{
	return parseInt (UDModule.COMP.getElement ("cbDepartments").value);
}

function getUserNameFltr_102510601a ()
{
    var oUserName = UDModule.VAL.formatText (UDModule.COMP.getElement ("txtUserNameFltr").value);
	
	if (oUserName == "-")
		oUserName = "blank";

	return oUserName;
}

function getUserNode_102510601a (nUserId)
{
	var arrInfo = null;

	for (var nIndex = 0; nIndex < m_arrNodes.length; nIndex++)
	{
		var arrNode = m_arrNodes [nIndex];
		if (parseInt (arrNode [iSAUserId]) == nUserId)
		{
			arrInfo = arrNode;
			break;
		}
	}
		
	return arrInfo;
}

function checkTxnPresent_102510601a (xmlDoc, nSAUserId)
{
	var nodeList = xmlDoc.getElementsByTagName (kSR_A_TxnPresent);
	if (nodeList != null && nodeList.length > 0)
	{
		UDModule.TBL.setEditRowColor (m_nSAUserId, nSAUserId);
		m_nSAUserId = nSAUserId;
		
		var objNode = nodeList [0];
		var arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
		
		var nTxnId = parseInt (arrInfo [0]);
		if (nTxnId == 1)	    
		    alert (m_arrMessages [iM_TxnPresent]);
	}
	
	resetRowColor_102510601a ();
}

function getProcessRequest_102510601a (oParam)
{
    return UDModule.PROJ.processRequest (oParam);
}

function resetRowColor_102510601a ()
{
	UDModule.TBL.setEditRowColor (m_nSAUserId, 0);
	m_nSAUserId = 0;
}

function isValidData_102510601a ()
{
	var bStatus = false;
	
	if (getCompanyUnitId_102510601a () == 0)
	{
		alert (m_arrMessages [iM_CompanyUnits]);
		UDModule.COMP.setFocus_DD ("cbCompanyUnits");
	}
	else
		bStatus = true;
	
	return bStatus;	
}
