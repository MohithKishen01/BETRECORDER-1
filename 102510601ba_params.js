function getInitParam_102510601ba ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kBA_InitData);
	xmlText += "</DataSet>";

	return xmlText;
}

function getEntityParams_102510601ba ()
{
	var xmlText ="<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kBA_InitData);
	xmlText += getEntityXML_102510601ba ();
	xmlText += "</DataSet>";

	return xmlText;
}

function getEntityXML_102510601ba ()
{
	var nBankId = getBankId_102510601ba ();
	
	var xmlText = "<"+ kCR_B_Entity+ "><id>";
	xmlText += nBankId + UDModule.Gk_DATA_SEP;
	xmlText += getCompanyUnitId_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getEntityTypeId_102510601ba  ();
    xmlText += "</id></" + kCR_B_Entity+">";

    return xmlText;
}

function getRecordParam_102510601ba ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kBA_Update);
	xmlText += getRecordXML_102510601ba ();
	xmlText += "</DataSet>";

	return xmlText;

}

function getRecordXML_102510601ba ()
{
	var oEntityId = "";
	
	if (getEntityTypeId_102510601ba () == 1 && getBankId_102510601ba () == 0)
		oEntityId = getCompanyUnitId_102510601ba ();
	else if (getBankId_102510601ba () == 0)
		oEntityId = getEntityId_102510601ba ();
	
	var xmlText = "<" + kCR_BA_Update + "><id>";
	
	xmlText += getBankId_102510601ba ()+ UDModule.Gk_DATA_SEP;
	xmlText += getCompanyUnitId_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getEntityTypeId_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += oEntityId  + UDModule.Gk_DATA_SEP;
	xmlText += getAccountName_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getBankName_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getBankAddress_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getBeneficiaryName_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getBeneficiaryAddress_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getCountry_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getCurrency_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getSwiftCode_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getAccountNumber_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += getIBAN_102510601ba () + UDModule.Gk_DATA_SEP;
	xmlText += intermediateBank_102510601ba ()+UDModule.Gk_DATA_SEP; 
	xmlText += correspondenceBank_102510601ba (); 

	xmlText +=  "</id></" + kCR_BA_Update + ">";

	return xmlText;
}
