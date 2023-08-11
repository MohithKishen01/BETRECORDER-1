function getInitParam_102510601aa ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kAA_InitData);
	xmlText += "</DataSet>";

	return xmlText;
}

function getUserInfoParam_102510601aa ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kAA_UserInfo);
	xmlText += getUserInfoXML_102510601aa ();
	xmlText += "</DataSet>";

	return xmlText;
}

function getUserInfoXML_102510601aa ()
{
	var xmlText = "<" + kCR_AA_UserInfo + "><id>";
	xmlText += getCompanyUnitId_102510601aa () + UDModule.Gk_DATA_SEP;
	xmlText += getUserGroupId_102510601aa ();
	xmlText += "</id></" + kCR_AA_UserInfo + ">";

    return xmlText;
}

function getRecordParam_102510601aa ()
{
	var xmlText = "<DataSet>";
	xmlText += UDModule.PROJ.getProcessXML (kAA_Update);
	xmlText += getRecordXML_102510601aa ();
	xmlText += "</DataSet>";

	return xmlText;
}

function getRecordXML_102510601aa ()
{
	var oGroupId = "";
	var oUserId  = "";
	
	if (getSAUserId_102510601aa () == 0)
	{
		oGroupId = getUserGroupId_102510601aa ();
		oUserId = getUserId_102510601aa ();
	}
	
	var xmlText = "<" + kCR_AA_Update + "><id>";
	xmlText += getCompanyUnitId_102510601aa () + UDModule.Gk_DATA_SEP;
	xmlText += getSAUserId_102510601aa () + UDModule.Gk_DATA_SEP;
	xmlText += getDepartmentId_102510601aa () + UDModule.Gk_DATA_SEP;
	xmlText += oGroupId + UDModule.Gk_DATA_SEP;
	xmlText += oUserId + UDModule.Gk_DATA_SEP;
	xmlText += getEmail_102510601aa () + UDModule.Gk_DATA_SEP;
	xmlText += getEmailPassword_102510601aa () + UDModule.Gk_DATA_SEP;
	xmlText += getCCEmail_102510601aa ();
	xmlText += "</id></" + kCR_AA_Update + ">";

    return xmlText;
}
