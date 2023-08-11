function getInitParam_102510601a ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kA_InitData);
	xmlText += "</DataSet>";

	return xmlText;
}

function getUserListParam_102510601a ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kA_UserList);	
	xmlText += getUserListXML_102510601a ();
	xmlText += "</DataSet>";

	return xmlText;
}

function getUserListXML_102510601a ()
{
	var xmlText = "<" + kCR_A_UserList + "><id>";
	xmlText += getCompanyUnitId_102510601a () + UDModule.Gk_DATA_SEP;
	xmlText += getDepartmentId_102510601a () + UDModule.Gk_DATA_SEP;
	xmlText += getUserNameFltr_102510601a ();
	xmlText += "</id></" + kCR_A_UserList + ">";

    return xmlText;
}

function getDeleteParam_102510601a (nSAUserId, nUserId)
{
	var xmlText = "<Dataset>";
	xmlText += UDModule.PROJ.getProcessXML (kA_Delete);
    xmlText += getDeleteXML_102510601a (nSAUserId, nUserId); 
    xmlText += getUserListXML_102510601a ();
	xmlText += "</Dataset>";

    return xmlText;
}

function getDeleteXML_102510601a (nSAUserId, nUserId)
{
    var xmlText = "<" + kCR_A_Delete + "><id>";
    xmlText += nSAUserId + UDModule.Gk_DATA_SEP;
    xmlText += nUserId;
    xmlText += "</id></" + kCR_A_Delete + ">";
    
    return xmlText;
}
