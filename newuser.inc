<table class="table_bg" width="350" align="center" cellpadding="0" cellspacing="0" border="0">
	<tr height="1">
		<td>
		</td>
	</tr>
	<tr height="22">
		<td colspan="3">
			<table class="title_list" width="350" height="100%" cellpadding="2" cellspacing="0" border="0">
				<tr>
					<td width="300">
						&nbsp;Settings<font class="module_sep">&nbsp;&raquo;&nbsp;</font>User Info
					</td>
					<td id="tdNewEdit" width="50" align="right">
                        &nbsp;
                    </td>
                    <td></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr height="26">
		<td class="border_left_bottom" width="6" align="right">
			&nbsp;<font class="required">*</font>
		</td>
		<td class="border_bottom" width="100">
			&nbsp;Department
		</td>
		<td class="border_bottom_right" width="244">
            <select id="cbDepartmentsEx" class="dropdown" onchange="departmentChanged_102510601aa ()" onkeyup="UDModule.COMP.changeFocus_CV (event, 'cbUserGroups')">
                <option value="0">[Choose One]</option>
            </select>
        </td>
	</tr>
	<tr height="26">
		<td class="border_left_bottom" width="6" align="right">
			&nbsp;<span id="spnReqUserGroup" class="required">*</span>
		</td>
		<td class="border_bottom" width="100">
			&nbsp;User Group
		</td>
		<td id="tdUserGroup" class="border_bottom_right name_highlight" width="244">
            <select id="cbUserGroups" class="dropdown" onchange="userGroupChanged_102510601aa ()" onkeyup="UDModule.COMP.changeFocus_CV (event, 'cbUserNames')">
                <option value="0">[Choose One]</option>
            </select>
        </td>
	</tr>
	<tr height="26">
		<td class="border_left_bottom" width="6" align="right">
			&nbsp;<span id="spnReqUserName" class="required">*</span>
		</td>
		<td class="border_bottom" width="100">
			&nbsp;User Name
		</td>
		<td id="tdUserName" class="border_bottom_right name_highlight" width="244">
            <select id="cbUserNames" class="dropdown" onchange="userNameChanged_102510601aa ()" onkeyup="UDModule.COMP.changeFocus_CV (event, 'txtEmail')">
                <option value="0">[Choose One]</option>
            </select>
        </td>
	</tr>
	<tr height="26">
		<td class="border_left_bottom" width="6" align="right">
			&nbsp;<font class="required">*</font>
		</td>
		<td class="border_bottom" width="100">
			&nbsp;From Email
		</td>
		<td id="tdEmail" class="border_bottom_right">
            <input type="text" id="txtEmail" class="textbox" maxlength="50" size="30" onkeypress="UDModule.COMP.changeFocus_CV (event, 'txtPassword')"/>
        </td>
	</tr>
	<tr height="26">
		<td class="border_left_bottom" width="6" align="right">
			&nbsp;<font class="required">*</font>
		</td>
		<td class="border_bottom" width="100">
			&nbsp;Email Password
		</td>
		<td id="tdPassword" class="border_bottom_right">
            <input type="password" id="txtPassword" class="textbox" maxlength="50" size="30" onkeypress="UDModule.COMP.changeFocus_CV (event, 'txtCCEmail')"/>
        </td>
	</tr>
	<tr height="26">
		<td class="border_left_bottom" width="6" align="right">
			&nbsp;
		</td>
		<td class="border_bottom" width="100">
			&nbsp;CC Email
		</td>
		<td id="tdCCEmail" class="border_bottom_right">
            <input type="text" id="txtCCEmail" class="textbox" maxlength="250" size="30" onkeypress="UDModule.COMP.changeFocus_CV (event, 'btnSubmit')"/>
        </td>
	</tr>
	<tr height="30">
		<td class="border_left_bottom" colspan="2">
			&nbsp;<font class="clear" title="Click here to Clear..." onclick="clearClicked_102510601aa ()">C L E A R</font>
		</td>
		<td class="border_bottom_right" align="right">
			<input type="button" id="btnSubmit" class="button" value="Submit" onclick="submitClicked_102510601aa ()" />&nbsp;&nbsp;
		</td>
	</tr>
</table>