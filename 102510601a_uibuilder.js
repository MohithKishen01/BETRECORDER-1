var m_arrInfo  = new Array ();
var m_arrNodes = new Array ();

function buildUserListUI_102510601a (xmlDoc)
{
	m_arrInfo = new Array (), m_arrNodes = new Array ();
	m_nRowCount = 0, m_nDepartmentId = 0;
	
	var oBuffer = [];
	
	UDModule.COMP.setDisplay ("tdUserList", "block");
	
	var nodeList = xmlDoc.getElementsByTagName (kSR_A_UserList);
	if (nodeList != null && nodeList.length > 0)
	{
		oBuffer.push ("<table class='table_bg' width='682' cellpadding='2' cellspacing='0' border='0'>");
		oBuffer.push (getHeaderRow_102510601a ());

		var m_nRowCount = 0, m_nDepartmentId = 0;
		for (var nIndex = 0; nIndex < nodeList.length; nIndex++)
		{
			var objNode = nodeList [nIndex];
			m_arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
			m_arrNodes [m_arrNodes.length] = m_arrInfo;
			
		    var nDepartmentId = parseInt (m_arrInfo [iDepartmentId]);
		    if (nDepartmentId != m_nDepartmentId)
			{
		    	oBuffer.push (getDepartmentRow_102510601a ());
		    	m_nDepartmentId = nDepartmentId;
		    	m_nRowCount = 0;
			}
		    
			oBuffer.push (getDataRow_102510601a (m_nRowCount));
			m_nRowCount++;
		}
		oBuffer.push ("</table>");
	}
	else
		oBuffer.push (UDModule.TBL.getNoDataPresentEx (700, 100, 1, "border_top_left_bottom_right"));

	UDModule.COMP.replaceDynamicHtml ("divUserList", oBuffer.join (""));
}

function getHeaderRow_102510601a ()
{
	var oBuffer = [];	
	oBuffer.push ("<tr class='headerrow' height='22'>");
	oBuffer.push ("<td class='border_top_left_bottom' width='25' align='center' nowrap=''>" + m_arrHeaders [iH_SerialNo] + "</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='25' align='center'>" + m_arrHeaders [iH_Info] + "</td>");			
	oBuffer.push ("<td class='border_top_left_bottom' width='150'>&nbsp;" + m_arrHeaders [iH_User] + "</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='200'>&nbsp;" + m_arrHeaders [iH_FromEmail] + "</td>");	
	oBuffer.push ("<td class='border_top_left_bottom' width='260'>&nbsp;" + m_arrHeaders [iH_CCEmail] + "</td>");	
	
	if (UDModule.PROJ.isFunction_PM (kFN_Delete))
		oBuffer.push ("<td class='border_top_left_bottom_right' width='23' align='center'>" + m_arrHeaders [iH_Delete] + "</td>");
	
	oBuffer.push ("</tr>");

	return oBuffer.join ("");
}

function getDepartmentRow_102510601a ()
{
	var oDepartmentName = m_arrInfo [iDepartmentName];
	
	var oBuffer = [];
	oBuffer.push ("<tr class='subtitle' height='22'>");
	oBuffer.push ("<td class='border_left_bottom_right' align='left' colspan='6'>&nbsp;" + oDepartmentName + "</td>");
	oBuffer.push ("</tr>");
	
	return oBuffer.join ("");
}

function getDataRow_102510601a (m_nRowCount)
{
	var nSAUserId = m_arrInfo [iSAUserId];
	var onMouseOver = " onmouseover='UDModule.TBL.changeRowColor (this, true)' ";
	var onMouseOut = " onmouseout='UDModule.TBL.changeRowColor (this, false)' ";
	
	var oBuffer = [];
	oBuffer.push ("<tr id='row_" + nSAUserId + "' height='22' " + onMouseOver + onMouseOut + ">");
	oBuffer.push (getIndexCell_102510601a (m_nRowCount));
	oBuffer.push (getInfoCell_102510601a ());	
	oBuffer.push (getUserNameCell_102510601a ());
	oBuffer.push (getFromEmailCell_102510601a ());
	oBuffer.push (getCCEmailCell_102510601a ());
	
	if (UDModule.PROJ.isFunction_PM (kFN_Delete))
		oBuffer.push (getDeleteCell_102510601a ());
	
	oBuffer.push ("</tr>");
	
	return oBuffer.join ("");
}

function getIndexCell_102510601a (m_nRowCount)
{
	var oCell = "<td class='border_left_bottom' align='center'>" + (m_nRowCount + 1) + "</td>";
	return oCell;
}

function getInfoCell_102510601a ()
{
	var oBuffer = [];
    oBuffer.push ("<table class=divToolTip width=180 cellpadding=1 cellspacing=0 border=0>");        
    oBuffer.push (getToolTipRow_102510601a (true, m_arrHeaders [iH_SAUserId], m_arrInfo [iSAUserId]));
    oBuffer.push (getToolTipRow_102510601a (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_CreatedBy), m_arrInfo [iCreatedBy]));
    oBuffer.push (getToolTipRow_102510601a (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_CreatedDate), m_arrInfo [iCreatedDate]));
    oBuffer.push (getToolTipRow_102510601a (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_CreatedTime), m_arrInfo [iCreatedTime]));
    oBuffer.push (getToolTipRow_102510601a (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_ModifiedBy), m_arrInfo [iModifiedBy]));
    oBuffer.push (getToolTipRow_102510601a (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_ModifiedDate), m_arrInfo [iModifiedDate]));
    oBuffer.push (getToolTipRow_102510601a (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GKINFO_ModifiedTime), m_arrInfo [iModifiedTime]));
	oBuffer.push ("</table>");

	var mouseOver = " onclick=\"UDModule.TBL.showToolTip_CV (event, '" + oBuffer.join ("") + "', 115, false)\" ";
	var mouseOut = " onmouseout=\"UDModule.TBL.hideToolTip ()\" ";
	
    var oImage = "<img src='" + kImagePath + "/info.gif' class='link'>";
    var oCell = "<td class='border_left_bottom' align='center' " + mouseOver + mouseOut + ">" + oImage + "</td>";
    
    return oCell;
}

function getToolTipRow_102510601a (bWidth, oHeader, oValue)
{
	var oWidth1 = bWidth ? " width=70 " : "";
	var oWidth2 = bWidth ? " width=110 " : "";
	
	var oBuffer = [];
	oBuffer.push ("<tr>");
	oBuffer.push ("<td valign=top " + oWidth1 + ">" + oHeader + "</td>");
	oBuffer.push ("<td valign=top " + oWidth2 + ">&nbsp;" + oValue + "</td>");
	oBuffer.push ("</tr>");	
	
	return oBuffer.join ("");
}

function getUserNameCell_102510601a ()
{
	var nSAUserId = m_arrInfo [iSAUserId];
	var oValue = m_arrInfo [iUserName];
	var oTitle	= m_arrMessages [iM_tUserName];

	var oCell = "<td class='border_left_bottom wordBreak'>";
	oCell += "<font class='link' title='click here to edit'" + oTitle + "' onclick='userNameClicked_102510601a (" + nSAUserId + ")'>" + oValue + "</font>";
	oCell += "</td>";
	return oCell;
}

function getFromEmailCell_102510601a ()
{
	var oValue = m_arrInfo [iEmail];

	var oCell = "<td class='border_left_bottom' align='left'>" + oValue + "</td>";
	return oCell;
}

function getCCEmailCell_102510601a ()
{
	var oValue = m_arrInfo [iEmailCC];
	
	oValue = (oValue == "")? "-" : oValue ;
	
	var oCell = "<td class='border_left_bottom_right' align='left'>" + oValue + "</td>";
	return oCell;
}

function getDeleteCell_102510601a ()
{
	var nSAUserId = m_arrInfo [iSAUserId];
	var nUserId = m_arrInfo [iUserId];
    var onClick = " onclick='deleteClicked_102510601a (" + nSAUserId + ", " + nUserId + ")' ";
    var oTitle = " title='" + m_arrMessages [iM_tDelete] + "' ";
    
	var oCell = "<td class='border_bottom_right' align='center'>";
	oCell += "<img src='" + kImagePath + "/x.gif' " + onClick + " class='cursor' " + oTitle + ">";
	oCell += "</td>";
	
	return oCell;
}