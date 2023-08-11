function isValidStatus_T31_102510601b (xmlDoc)
{
	var bStatus = false; 
	var nodeList = xmlDoc.getElementsByTagName (UDModule.GkSR_Status);
    if (nodeList != null && nodeList.length > 0)
    {
        for (var nIndex = 0; nIndex < nodeList.length; nIndex++)
        {
            var objNode = nodeList [nIndex];
            var arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
            bStatus = false;

            if (arrInfo [UDModule.GkS_STATUSID] == -1)
            {
                switch (parseInt (arrInfo [UDModule.GkS_TASKID]))
                {  
                	case T31_FunctionPM:
                        alert (m_arrMessages [iM31_FunctionPM]);
                        break;
                	case T31_CompanyUnits:
                		alert (m_arrMessages_T31 [iM31_CompanyUnits]);
                		break;
                	case T31_EntityType:
                		alert(m_arrMessages_T31[iM31_EntityType]);
                }
                break;
            }
            else
                bStatus = true;
        }
    }
   
    return bStatus;
}

function isValidStatus_T33_102510601b (xmlDoc)
{
	var bStatus = false; 
	var nodeList = xmlDoc.getElementsByTagName (UDModule.GkSR_Status);
	if (nodeList != null && nodeList.length > 0)
	{
		for (var nIndex = 0; nIndex < nodeList.length; nIndex++)
	    {
			var objNode = nodeList [nIndex];
            var arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
            bStatus = false;

            if (arrInfo [UDModule.GkS_STATUSID] == -1)
            {
                switch (parseInt (arrInfo [UDModule.GkS_TASKID]))
                {  
                	case T33_Entity:
                        alert (m_arrMessages_T33 [iM33_Entity]);
                        break;
                }
                break;
            }
            else
                bStatus = true;
	    }
	}
	return bStatus;
}

function isValidStatus_T34_102510601b (xmlDoc)
{
	var bStatus = false; 
	var nodeList = xmlDoc.getElementsByTagName (UDModule.GkSR_Status);
	if (nodeList != null && nodeList.length > 0)
	{
		for (var nIndex = 0; nIndex < nodeList.length; nIndex++)
	    {
			var objNode = nodeList [nIndex];
            var arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
            bStatus = false;

            if (arrInfo [UDModule.GkS_STATUSID] == -1)
            {
                switch (parseInt (arrInfo [UDModule.GkS_TASKID]))
                {  
                	case GT_BankList:
                        alert (m_arrMessages_GT [iGM_BankList]);
                        break;
                }
                break;
            }
            else
                bStatus = true;
	    }
	}
	return bStatus;
}

function isValidStaus_T35_102510601b (xmlDoc)
{ 
	var bStatus = false;
	var nodeList = xmlDoc.getElementsByTagName (UDModule.GkSR_Status);
	if (nodeList != null && nodeList.length > 0)
	{
	    for (var nIndex = 0; nIndex < nodeList.length; nIndex++)
	    {
	        var objNode = nodeList [nIndex];
	        var arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
	        bStatus = false;
	
	        if (arrInfo [UDModule.GkS_STATUSID] == -1)
	        {
	            switch (parseInt (arrInfo [UDModule.GkS_TASKID]))
	            {         
	            	case T35_ProcessDelete:
						alert (m_arrMessages_T35 [iM35_Delete]);
	                    break;
	            }
	            break;
	        }
	        else
	            bStatus = true;
	    }
	}
	return bStatus;
}