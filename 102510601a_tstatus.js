function isValidStatus_T11_102510601a (xmlDoc)
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
                    case T11_FunctionPM:
                        alert (m_arrMessages_T11 [iM11_FunctionPM]);
                        break;
                    case T11_CompanyUnits :
                        alert (m_arrMessages_T11 [iM11_CompanyUnits]);
                        break; 
                    case GT_Departments:
                        alert (m_arrMessages_GT [iGM_Departments]);
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

function isValidStatus_T14_102510601a (xmlDoc)
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
                    case GT_UserList:
                        alert (m_arrMessages_GT [iGM_UserList]);
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

function isValidStatus_T15_102510601a (xmlDoc)
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
                	case T15_ProcessDelete:
						alert (m_arrMessages_T15 [iM15_ProcessDelete]);
                        break;
                	case T15_DelInsert:
						alert (m_arrMessages_T15 [iM15_DelInsert]);
                        break;
                	case T15_Delete:
						alert (m_arrMessages_T15 [iM15_Delete]);
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
