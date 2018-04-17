<?php

$html = '<div class="">
			<form>
				<div class="form-group">
					<input type="text" name="name" class="form-control" placeholder="Name" amsify-validate="required">
				</div>
				<div class="form-group">
					<input type="password" name="pasword" class="form-control" placeholder="Email" amsify-validate="required">
				</div>
				<div class="form-group">
					<input type="submit" class="btn btn-default"/>
				</div>
			</form>
		</div>';

$html .= '<script>
			$("form").amsifyForm({
				ajax: {
					action  	: "modal/examples/action.php",
					closeModal	: function(selector, data) {
						$parent = $(selector).closest("tr");
						//$parent = $(selector).parent();
						AmsifyHelper.actionBackground($parent, "update");
					}
				}
			});
		</script>';

header('Content-type: application/json');
echo json_encode(array(
						'status' 	=> true,
						'message' 	=> 'Deleted Successfully',
						'html' 		=> $html
					));