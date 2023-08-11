var m_arrInfo  = new Array ();
var m_arrNodes = new Array ();

function buildBankListUI_102510601b (xmlDoc)
{
	m_arrInfo = new Array () , m_arrNode = new Array ();
	
	var oBuffer = []; 
	
	UDModule.COMP.setDisplay ("tdBankList","block");

	var nodeList = xmlDoc.getElementsByTagName (kSR_B_BankList);
	if (nodeList != null && nodeList.length > 0)
	{
		oBuffer.push ("<table class='table_bg' width='782' cellpadding='2' cellspacing='0' border='0'>");
		oBuffer.push (getHeaderRow_102510601b ());
		for (var nIndex = 0; nIndex < nodeList.length; nIndex++)
		{
			var objNode = nodeList [nIndex];
			m_arrInfo = UDModule.DOM.getXMLIndexValue (objNode, 0).split (UDModule.Gk_DATA_SEP);
			m_arrNodes [m_arrNodes.length] = m_arrInfo;
			oBuffer.push (getDataRow_102510601b (nIndex));
		}
		oBuffer.push ("</table>");
	}
	UDModule.COMP.replaceDynamicHtml ("divBankList", oBuffer.join (""));
}

function getHeaderRow_102510601b ()
{
	var oBuffer = [];
	var entityTypeId = getEntityTypeId_102510601b ()
	
	oBuffer.push ("<tr class='headerrow' height='22'>");
	oBuffer.push ("<td class='border_top_left_bottom' width='20' align='center'>"+ m_arrHeaders [iH_SerialNo] +"</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='30' align='center'>"+ m_arrHeaders [iH_Info] +"</td>");
	
	if(entityTypeId === 2)
	{
		oBuffer.push ("<td class='border_top_left_bottom' width='190'align='left'>&nbsp;"+ m_arrHeaders [iH_ClientName] +"</td>");
	}
	else if(entityTypeId === 3)
	{
		oBuffer.push ("<td class='border_top_left_bottom' width='190'align='left'>&nbsp;"+ m_arrHeaders [iH_BookieName] +"</td>");
	}
	
	oBuffer.push ("<td class='border_top_left_bottom' width='170' align='left'>"+ m_arrHeaders [iH_AccountName] +"</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='120' align='left'>"+ m_arrHeaders [iH_BankName] +"</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='100'align='left'>&nbsp;"+ m_arrHeaders [iH_Country] +"</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='40'align='left'>&nbsp;"+ m_arrHeaders [iH_CUR] +"</td>");
	oBuffer.push ("<td class='border_top_left_bottom' width='25'align='center'>&nbsp;"+ m_arrHeaders [iH_BankId] +"</td>");
	oBuffer.push ("</tr>");
	
	return oBuffer.join("");
}

function getDataRow_102510601b (nIndex)
{
	var oBuffer = [] ;
	
	var nBankId = m_arrInfo [iBankId]; 
	
	oBuffer.push ("<tr id='row_12' height='22' onmouseover='UDModule.TBL.changeRowColor (this, true)' onmouseout='UDModule.TBL.changeRowColor (this, false)' class='rowout'>");
	oBuffer.push (getIndexCell_102510601b (nIndex));
	oBuffer.push (getInfoCell_102510601b ());
	oBuffer.push (getEntityName_102510601b ());
	oBuffer.push (getAccountName_102510601b ());
	oBuffer.push (getBankName_102510601b ());
	oBuffer.push (getCountryName_102510601b ());
	oBuffer.push (getCurrency_102510601b ());
	oBuffer.push (getDeleteCell_102510601b ());
	
	oBuffer.push ("</tr>");
	
	return oBuffer.join("");
}

function getIndexCell_102510601b (nIndex)
{
	var oCell = "<td class='border_left_bottom' align='center'>"+(nIndex+1)+"</td>";
	return oCell;
}

function getInfoCell_102510601b ()
{
	var oBuffer = [];
    oBuffer.push ("<table class=divToolTip width=290 cellpadding=1 cellspacing=0 border=0>"); 
    oBuffer.push (getToolTipRow_102510601b (true, m_arrHeaders [iH_AccountNo], m_arrInfo [iAccountNumber]));
    oBuffer.push (getToolTipRow_102510601b (true, m_arrHeaders [iH_SwiftBan], m_arrInfo [iSwiftCode]));
    oBuffer.push (getToolTipRow_102510601b (true, m_arrHeaders [iH_iBAN], m_arrInfo [iIban]));
    oBuffer.push (getToolTipRow_102510601b (true, m_arrHeaders [iH_AutoId], m_arrInfo [iBankId]));
    oBuffer.push (getToolTipRow_102510601b (true," "," "));
    oBuffer.push (getToolTipRow_102510601b (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_CreatedBy), m_arrInfo [iCreatedBy]));
    oBuffer.push (getToolTipRow_102510601b (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_CreatedDate), m_arrInfo [iCreatedDate]));
    oBuffer.push (getToolTipRow_102510601b (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_CreatedTime), m_arrInfo [iCreatedTime]));
    oBuffer.push (getToolTipRow_102510601b (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_ModifiedBy), m_arrInfo  [iModifiedBy]));
    oBuffer.push (getToolTipRow_102510601b (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GkINFO_ModifiedDate), m_arrInfo [iModifiedDate]));
    oBuffer.push (getToolTipRow_102510601b (false, UDModule.MSG.getInfoHeader (UDModule.MSG.GKINFO_ModifiedTime), m_arrInfo [iModifiedTime]));
	oBuffer.push ("</table>");

	var mouseOver = " onclick=\"UDModule.TBL.showToolTip_CV (event, '" + oBuffer.join ("") + "', 115, false)\" ";
	var mouseOut = " onmouseout=\"UDModule.TBL.hideToolTip ()\" ";
	
    var oImage = "<img src='" + kImagePath + "/info.gif' class='link'>";
    var oCell = "<td class='border_left_bottom' align='center' " + mouseOver + mouseOut + ">" + oImage + "</td>";
    
    return oCell;
}

function getToolTipRow_102510601b (bWidth, oHeader, oValue)
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

function getEntityName_102510601b ()
{
	var nBankId = m_arrInfo [iBankId];
	var entityName = m_arrInfo [iEntityName];
	var entityId = m_arrInfo [iEntityId];
	
	var oCell = "<td class='border_left_bottom wordBreak'>" ;
	oCell += " <font class='link' title ='click here to edit' onclick = 'entityNameClicked_102510601b (" + nBankId + ")'>"+ entityName +"</font></td>";
	return oCell;
}

function getAccountName_102510601b ()
{
	var oCell = "<td class='border_left_bottom wordBreak'>"+m_arrInfo [iAccountName]+"</td>";
	return oCell;
}

function getBankName_102510601b ()
{
	var oCell = "<td class='border_left_bottom wordBreak'>"+m_arrInfo [iBankName]+"</td>";
	return oCell;
}

function getCountryName_102510601b ()
{
	var oCell = "<td class='border_left_bottom wordBreak'>"+m_arrInfo [iCountryName]+"</td>";
	return oCell;
}

function getCurrency_102510601b ()
{
	var oCell = "<td class='border_left_bottom' align='center'>&nbsp;"+m_arrInfo [iCurrencyCode]+"</td>";
	return oCell;
}

function getDeleteCell_102510601b ()
{
	var nBankId = m_arrInfo [iBankId];
	var nEntityId = m_arrInfo [iEntityId];
		
    var delClick = "'deleteClicked_102510601b (" + nBankId + ","+ nEntityId+ ")' ";
	var oCell = "<td class='border_left_bottom_right' align='center'><img src='../../../../resource/images/default/info//x.gif'  class='cursor' title='Click here to Delete...' onclick = "+ delClick +" ></td>";
	return oCell;
}