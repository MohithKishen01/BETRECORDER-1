<table id="tblMain" class="table_bg" width="800" align="center" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td>
			<%@ include file="goto.inc" %>
		</td>
	</tr>
	<tr>
		<td class="border_left_bottom_right">
			<table class="table_bg" align="right" cellpadding="0" cellspacing="0" border="0">
				<tr height="26">
					<td>
					</td>
					<td>
						Company Unit
					</td>
					<td width="10"></td>
					<td>
						Entity Type
					</td>
					<td width="10">
					</td>
					<td id="entity">
						Entity
					</td>
					<td width="5">
					</td>
					<td>
						Search
					</td>
					<td width="10"></td>
					<td width="5"></td>
					<td>
						<font class="boldlink" onclick="addBankClicked_102510601b (0)" title="Click here to Add Bank">Add Bank</font>
					</td>
					<td width="5"></td>
				</tr>
				<tr height="26">
					<td>
					</td>
					<td>
						<select class="dropdown" id="cbCompanyUnits" onchange="companyUnitChanged_102510601a ()" onkeyup="UDModule.COMP.changeFocus_CV (event, 'cbDepartments')">
							<option value="0">[Choose One]</option>
						</select>
					</td>
					<td></td>
					<td>
						<select id="cbEntityType" class="dropdown" onchange="entityTypeChanged_102510601b ()"  onkeyup="UDModule.COMP.changeFocus_CV (event, 'cbEntity')">
							<option value="0">[Choose One]</option>
						</select>
					</td>
					<td>
					</td>
					<td>
						<select id="cbEntity" class="dropdown" onchange="entityChanged_102510601b ()"  onkeyup="UDModule.COMP.changeFocus_CV (event, 'txtBankNameFltr')">
							<option value="0">[All]</option>
						</select>
					</td>
					<td width="5">
					</td>
					<td>
						<input type="text" id="txtBankNameFltr" class="textboxcenter" maxlength="50" size="15" onkeypress="searchKeyPressed_102510601b (event)"/>
					</td>
					<td id="tdSearch" valign="center">
						<img src="../../../../resource/images/default/info/search.gif" class="cursor" onclick="searchImgClicked_102510601b ()" />
					</td>
					<td></td>
					<td></td>
				</tr>			
			</table>
		</td>
	</tr>
	<tr height="5"><td></td></tr>
	<tr>
		<td width="800">
        	<table width="100%" cellpadding="0" cellspacing="0" border="0">
			    <tr>
			        <td id="tdBankList" align="left" display="none">
			            <div id="divBankList" style="width:800; height:443; overflow:auto;"></div>
			        </td>
			    </tr>
			</table>
			<div id="divToolTip" style="position:absolute; visibility:hidden;"></div>
    	</td> 
	</tr>
</table>
