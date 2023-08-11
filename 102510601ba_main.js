var m_arrFilters = new Array ();
var m_arrInfo	= new Array ();

function onload_102510601ba ()
{
	Constructor_102510601ba ();
	init_102510601ba ()
}

function init_102510601ba ()
{
    UDModule.PROJ.loadDefaultTheme (); 
    
	var oURL = unescape (window.location.href);
	var arrURL = oURL.split ("?");
    m_arrFilters = arrURL [1].split (UDModule.Gk_DATA_SEP);
   
    if(getBankId_102510601ba () > 0)
    {
    	showBankDetails_102510601ba ()
    }

    initData_102510601ba ();
}

function initData_102510601ba ()
{
	var xmlDoc = getProcessRequest_102510601ba (getEntityParams_102510601ba ());
	if(UDModule.PROJ.isValidStatus(xmlDoc))
	{
		if(isValidStatus_T41_102510601ba (xmlDoc))
		{
			fillEntites_102510601ba (xmlDoc);
			fillCountries_102510601ba (xmlDoc);
			fillCurrency_102510601ba (xmlDoc);
		}
	}
}

function fillEntites_102510601ba (xmlDoc)
{
	 var nodeList = xmlDoc.getElementsByTagName (kSR_B_Entity);
	 UDModule.COMP.fillDropDown (nodeList, "cbEntitiesEx", 1, 0);
}

function fillCountries_102510601ba (xmlDoc)
{
	var nodeList = xmlDoc.getElementsByTagName (kSR_BA_Country);
	UDModule.COMP.fillDropDown (nodeList , "cbCountries", 1 ,0);
}

function fillCurrency_102510601ba (xmlDoc)
{
	var nodeList = xmlDoc.getElementsByTagName (kSR_BA_Currency);
	UDModule.COMP.fillDropDown (nodeList , "cbCurrencies", 1 ,0);
}

function getProcessRequest_102510601ba (oParam)
{
	return UDModule.PROJ.processRequest (oParam);
}

function getBankId_102510601ba ()
{
	return m_arrFilters [0];
}

function getCompanyUnitId_102510601ba ()
{
	return m_arrFilters [1];
}

function getEntityTypeId_102510601ba ()
{
	return m_arrFilters [2];
}

function getEntityId_102510601ba ()
{
	return 	parseInt(UDModule.COMP.getElement ("cbEntitiesEx").value);
}

function getAccountName_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtAccName").value);
}

function getBankName_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtBankName").value);
}

function getBankAddress_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtBankAddress").value);
}

function getBeneficiaryName_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtBeneficiary").value);
}

function getBeneficiaryAddress_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtBenfAddress").value);
}

function getCountry_102510601ba ()
{
	return parseInt (UDModule.COMP.getElement ("cbCountries").value);
}

function getCurrency_102510601ba ()
{
	return parseInt (UDModule.COMP.getElement ("cbCurrencies").value);	
}

function getSwiftCode_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtSwiftCode").value);
}

function  getAccountNumber_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtAccNumber").value);
}

function getIBAN_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtIBan").value);
}

function intermediateBank_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtInterBank").value);
}

function correspondenceBank_102510601ba ()
{
    return UDModule.VAL.stringtrim (UDModule.COMP.getElement ("txtCorrespdBank").value);
}

function showBankDetails_102510601ba ()
{
	var arrInfo = window.opener.getBankNode_102510601b (getBankId_102510601ba ());
console.log(arrInfo);

	var oEntityNameCell = "<td class='border_bottom_right'>" +
		"<font class= 'name_highlight'>" + arrInfo [iEntityName] + "</font></td>";
	
	UDModule.COMP.replaceDynamicHtml ("tdEntitiesEx", oEntityNameCell);

	UDModule.COMP.getElement ("txtAccName").value = arrInfo [iAccountName];
	UDModule.COMP.getElement ("txtBankName").value = arrInfo [iBankName];
	UDModule.COMP.getElement ("txtBankAddress").value = arrInfo [iBankAddress];
	UDModule.COMP.getElement ("txtBeneficiary").value = arrInfo [iBeneficiaryName];
	UDModule.COMP.getElement ("txtBenfAddress").value = arrInfo [iBeneficiaryAddress];
	UDModule.COMP.getElement ("cbCountries").value = arrInfo [iCountryId];
	UDModule.COMP.getElement ("cbCurrencies").value = arrInfo [iCurrencyId];
	UDModule.COMP.getElement ("txtSwiftCode").value	= arrInfo [iSwiftCode];
	UDModule.COMP.getElement ("txtAccNumber").value = arrInfo [iAccountNumber];
	UDModule.COMP.getElement ("txtIBan").value = arrInfo [iIban];
	UDModule.COMP.getElement ("txtInterBank").value = arrInfo [iIntermediateBank];
	UDModule.COMP.getElement ("txtCorrespdBank").value = arrInfo [iCorrespondenceBank];
}

function isValidData_102510601ba ()
{
	var bStatus = false;
	
	if (getAccountName_102510601ba () == "")
	{
		alert (m_arrMessages [iM_AccountName]);
		UDModule.COMP.setFocus_DD ("txtAccName");
	}
	else if (getBankName_102510601ba () == "")
	{
		alert (m_arrMessages [iM_BankName]);
		UDModule.COMP.setFocus_DD ("txtBankName");
	}
	else if (getBankAddress_102510601ba () == "")
	{
		alert (m_arrMessages [iM_BankAddress]);
		UDModule.COMP.setFocus_DD ("txtBankAddress");
	}
	else if (getBeneficiaryName_102510601ba () == "")
	{
		alert (m_arrMessages [iM_BeneficiaryName]);
		UDModule.COMP.setFocus ("txtBeneficiary");
	}
	else if (getCountry_102510601ba () == 0)
	{
		alert (m_arrMessages [iM_Country]);
		UDModule.COMP.setFocus ("cbCountries");
	}
	else if (getCurrency_102510601ba () == 0)
	{
		alert (m_arrMessages [iM_Currency]);
		UDModule.COMP.setFocus ("cbCurrencies");
	}
	else if (getBeneficiaryAddress_102510601ba () == "")
	{
		alert (m_arrMessages [iM_BeneficiaryAddress]);
		UDModule.COMP.setFocus_DD ("txtEmail");	
	}
	else if (getSwiftCode_102510601ba () == "")
	{
		alert (m_arrMessages [iM_SwiftCode]);
		UDModule.COMP.setFocus ("txtSwiftCode");
	}
	else if (getAccountNumber_102510601ba () == "")
	{
		alert (m_arrMessages [iM_AccountNumber]);
		UDModule.COMP.setFocus ("txtAccNumber");
	}
	else if (getIBAN_102510601ba () == "")
	{
		alert (m_arrMessages [iM_IBAN]);
		UDModule.COMP.setFocus ("txtIBan");
	}
	else if (intermediateBank_102510601ba () == "")
	{
		alert (m_arrMessages [iM_IntermediateBank]);
		UDModule.COMP.setFocus ("txtInterBank");
	}
	else if (correspondenceBank_102510601ba () == "")
	{
		alert (m_arrMessages [iM_CorrespondenceBank]);
		UDModule.COMP.setFocus ("txtCorrespdBank");
	}
	else
		bStatus = true;
	
	return bStatus;	
}

function resetPopUpValues_102510601ba ()
{
	if (getBankId_102510601ba () == 0)
	{
		UDModule.COMP.getElement ("txtAccName").value		= "";	
		UDModule.COMP.getElement ("txtBankName").value		= "";
		UDModule.COMP.getElement ("txtBankAddress").value	= "";
		UDModule.COMP.getElement ("txtBeneficiary").value	= "";
		UDModule.COMP.getElement ("txtBenfAddress").value	= "";
		UDModule.COMP.getElement ("txtSwiftCode").value		= "";
		UDModule.COMP.getElement ("txtAccNumber").value		= "";
		UDModule.COMP.getElement ("txtIBan").value			= "";
		UDModule.COMP.getElement ("txtInterBank").value		= "";
		UDModule.COMP.getElement ("txtCorrespdBank").value	= "";
		
		UDModule.COMP.setFocus_DD ("cbEntitiesEx");
	}
	else
		window.close ();
}
