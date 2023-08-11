var m_nSBBankId = 0;

function companyUnitChanged_102510601a ()
{
	UDModule.COMP.setFocus ("cbEntity");
	document.getElementById("tdBankList").style.display = "none";
}

function entityTypeChanged_102510601b ()
{
	document.getElementById("tdBankList").style.display = "none";
	
	if (getEntityTypeId_102510601b () == 1)
	{
		document.getElementById("cbEntity").style.display = "none";
		document.getElementById("entity").style.display = "none";
	}
	else
	{
		document.getElementById("cbEntity").style.display = "block";
		document.getElementById("entity").style.display = "block";
		
	}
	if (getCompanyUnitId_102510601b () == 0)	
	{
		alert (m_arrMessages [iM31_CompanyUnits]);
		UDModule.COMP.setFocus_DD ("cbCompanyUnits");
	}
	var xmlDoc = getProcessRequest_102510601b(getEntityParams_102510601b ());

	if(UDModule.PROJ.isValidStatus (xmlDoc))
	{
		if(isValidStatus_T33_102510601b(xmlDoc))
		{
			fillEntity_102510601b (xmlDoc);
		}
	}
	
}

function entityChanged_102510601b ()
{
		searchImgClicked_102510601b ();
}

function searchKeyPressed_102510601b (oEvent)
{
	 if (!oEvent)
	        oEvent = window.event;
	        
	    if (oEvent.keyCode == 13)
	    	searchImgClicked_102510601b ();
}

function searchImgClicked_102510601b ()
{
	getBankList_102510601b ();
}

function getBankList_102510601b ()
{
	if(isValidData_102510601b ())
	{
		var xmlDoc = getProcessRequest_102510601b (getBankListParam_102510601b ());
		if(UDModule.PROJ.isValidStatus (xmlDoc))
		{
			if(isValidStatus_T34_102510601b (xmlDoc))
			{
				buildBankListUI_102510601b (xmlDoc);
			}
		}
	}
}

function entityNameClicked_102510601b (nSBBankId)
{
	addBankClicked_102510601b (nSBBankId);
	
	UDModule.TBL.setEditRowColor (m_nSBBankId, nSBBankId);
	m_nSBBankId = nSBBankId;
}

function deleteClicked_102510601b (nBankId,nEntity)
{
	if (window.confirm (m_arrMessages [iM_tDelete]))
	{
		var xmlDoc = getProcessRequest_102510601b (getDeleteParams_102510601b (nBankId,nEntity));
		console.log(xmlDoc);
		if (UDModule.PROJ.isValidStatus (xmlDoc))
		{
			isValidStaus_T35_102510601b (xmlDoc)
			{
				searchImgClicked_102510601b ();
			}
		}
	}
}

function addBankClicked_102510601b (nBankId)
{
	if(isValidData_102510601b ())
	{
		var oParam = nBankId + UDModule.Gk_DATA_SEP;
		oParam += getCompanyUnitId_102510601b () + UDModule.Gk_DATA_SEP ;
		oParam += getEntityTypeId_102510601b ();
		
		var windowStyle = "width=550, height=500, left=700, top=220, status=yes, toolbar=no, " +
	    "menubar=no, location=no, resizable=yes, scrollbars=no";
		
		m_arrPopups [iW_NewBank] =
			 window.open ("../../en/ba_newbankinfo/newbank" + UDModule.PROJ.PageExtension + "?" + oParam, "newBank", windowStyle);
		
		m_arrPopups [iW_NewBank].focus ();
	}
}
