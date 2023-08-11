function isValidStatus_T41_102510601ba (xmlDoc)
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
	            	case T41_CompanyUnits :
	            		alert(m_arrMessages_T41 [iM41_CompanyUnits]);
	            		break;
	            	case T42_EntityType :
	            		alert(m_arrMessages_T41 [iM41_EntityType]);
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

function isValidStatus_T44_102510601ba (xmlDoc)
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
	            	case T44_InsertBank :
	            		alert(m_arrMessages_T44 [iM44_InsertBank]);
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