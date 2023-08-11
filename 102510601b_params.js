function getInitParam_102510601b ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kB_InitData);
	xmlText += "</DataSet>";
	
	return xmlText;
}

function getEntityParams_102510601b ()
{
	var xmlText ="<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kB_Entity);
	xmlText += getEntityXML_102510601b ();
	xmlText += "</DataSet>";
	
	return xmlText;
}

function getEntityXML_102510601b ()
{
	var nBankId = "";
	
	var xmlText = "<"+ kCR_B_Entity+ "><id>";
	xmlText += nBankId + UDModule.Gk_DATA_SEP;
	xmlText += getCompanyUnitId_102510601b () + UDModule.Gk_DATA_SEP;
	xmlText += getEntityTypeId_102510601b  ();
    xmlText += "</id></" + kCR_B_Entity+">";
   
    return xmlText;
}

function getBankListParam_102510601b ()
{
	var xmlText ="<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kB_BankList);
	xmlText += getBankListXML_102510601b ();
	xmlText +="</DataSet>";

	return xmlText;
}

function getBankListXML_102510601b ()
{
	var xmlText = "<"+ kCR_B_BankList +"><id>";
	xmlText += getCompanyUnitId_102510601b () + UDModule.Gk_DATA_SEP;
	xmlText += getEntityTypeId_102510601b ()  + UDModule.Gk_DATA_SEP;
	xmlText += getEntity_102510601b () + UDModule.Gk_DATA_SEP;
	xmlText += getBankNameFltr_102510601b ();
	xmlText += "<id></"+ kCR_B_BankList +">";

	return xmlText;
}

function getDeleteParams_102510601b (nBankId,nEntityId)
{
	var xmlText ="<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kB_Delete);
	xmlText += getDeleteXML_102510601b (nBankId);
	xmlText += getBankListXML_102510601b();
	xmlText += "</DataSet>";

	return xmlText;
}

function getDeleteXML_102510601b (nBankId)
{
	var xmlText = "<"+ kCR_B_Delete +"><id>";
	xmlText += nBankId;
	xmlText += "<id></" + kCR_B_Delete +">";
	
	return xmlText;
}


