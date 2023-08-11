function isValidStatus_T21_102510601aa (xmlDoc)
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
                	case T21_FunctionPM:
                        alert (m_arrMessages_T21 [iM21_FunctionPM]);
                        break;
                	case GT_Departments:
                        alert (m_arrMessages_GT [iGM_Departments]);
                        break;
                    case T21_UserGroups:
                        alert (m_arrMessages_T21 [iM21_UserGroups]);
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

function isValidStatus_T22_102510601aa (xmlDoc)
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
                    case T22_UserInfo:
                        alert (m_arrMessages_T22 [iM22_UserInfo]);
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

function isValidStatus_T23_102510601aa (xmlDoc)
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
                	case T23_ProcessUpdate:
                        alert (m_arrMessages_T23 [iM23_ProcessUpdate]);
                        break;
                	case T23_InsertUser:
                        alert (m_arrMessages_T23 [iM23_InsertUser]);
                        break;
                    case T23_UpdateUser:
                        alert (m_arrMessages_T23 [iM23_UpdateUser]);
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
