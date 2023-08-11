/**
	Creates an object of BankInfo and initializes all member variables.
	Invokes init function.

    @author    Mohith
    @version    1.0.0
*/
var m_arrPopups =  new Array (null, null, null); 
var m_nSAUserId = -1;

function onload_102510601b ()
{
	Constructor_102510601b ();
	init_102510601b ();
}

function unload_102510601b ()
{
	UDModule.PROJ.closeHelp ();

	for (var nIndex = 0; nIndex < m_arrPopups.length; nIndex++)
		UDModule.COMP.closeWindow (m_arrPopups [nIndex]);
}

function init_102510601b ()
{
    UDModule.PROJ.loadDefaultTheme (); 
    
	initData_102510601b ();
}

function initData_102510601b ()
{
	var xmlDoc = getProcessRequest_102510601b (getInitParam_102510601b ());
	if(UDModule.PROJ.isValidStatus(xmlDoc))
	{
		if(isValidStatus_T31_102510601b (xmlDoc))
		{
			UDModule.PROJ.setFunction_PM (xmlDoc);
			fillCompanyUnits_102510601b (xmlDoc);
			fillEntityTypes_102510601b (xmlDoc);
		}
	}
}

function fillCompanyUnits_102510601b (xmlDoc)
{
	var nodeList = xmlDoc.getElementsByTagName(kSR_B_CompanyUnits);
	UDModule.COMP.fillDropDown (nodeList, "cbCompanyUnits", 1, 0);

	if (UDModule.COMP.getElement ("cbCompanyUnits").options.length > 1)
		UDModule.COMP.getElement ("cbCompanyUnits").selectedIndex = 1;
}

function fillEntity_102510601b (xmlDoc)
{
	var nodeList = xmlDoc.getElementsByTagName(kSR_B_Entity);
	UDModule.COMP.fillDropDown (nodeList,"cbEntity", 1, 0);
}

function fillEntityTypes_102510601b (xmlDoc)
{
	
	var nodeList = xmlDoc.getElementsByTagName (kSR_B_EntityType);
	UDModule.COMP.fillDropDown (nodeList,"cbEntityType", 1, 0);
}

function getCompanyUnitId_102510601b ()
{
	return parseInt(UDModule.COMP.getElement ("cbCompanyUnits").value);
}

function getEntityTypeId_102510601b ()
{
	return parseInt(UDModule.COMP.getElement ("cbEntityType").value);
}

function getEntity_102510601b ()
{
	return parseInt(UDModule.COMP.getElement ("cbEntity").value);
}

function getBankNameFltr_102510601b ()
{
    var oBankName = UDModule.VAL.formatText (UDModule.COMP.getElement ("txtBankNameFltr").value);
	
	if (oBankName == "-")
		oBankName = "blank";

	return oBankName;
}

function getProcessRequest_102510601b (oParam)
{
	return UDModule.PROJ.processRequest(oParam);
}

function getBankNode_102510601b (nBankId)
{
	var arrInfo = null;

	for (var nIndex = 0; nIndex < m_arrNodes.length; nIndex++)
	{
		var arrNode = m_arrNodes [nIndex];
		if (parseInt (arrNode [iBankId]) == nBankId)
		{
			arrInfo = arrNode;
			break;
		}
	}
		
	return arrInfo;
}

function getTransactionPresent_102510601b (xmlDoc,nBankId)
{
	var nodeList = xmlDoc.getElementsByTagName (kSR_A_TxnPresent);
	if(nodeList!=null&& nodeList.length > 0)
	{	
		UDModule.TBL.setEditRowColor (m_nSAUserId, nBankId);
		m_nSAUserId = nSAUserId;
	
		var objNode = nodeList [0];
		var arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
	
		var nTxnId = parseInt (arrInfo [0]);
		if (nTxnId == 1)	    
	    alert (m_arrMessages [iM_TxnPresent]);
	}
}

function isValidData_102510601b ()
{
	var bStatus = false;
	
	if(getCompanyUnitId_102510601b () == 0)
	{
		alert(m_arrMessages_T31 [iM31_CompanyUnits]);
		UDModule.COMP.setFocus_DD ("cbCompanyUnits");
	}
	else if (getEntityTypeId_102510601b () == 0)
	{
		alert(m_arrMessages_T31 [iM31_EntityType]);
		UDModule.COMP.setFocus_DD ("cbEntityType");
	}
	else
		bStatus = true;
	
	return bStatus;
}
