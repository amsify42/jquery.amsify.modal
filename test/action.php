<?php

$html = '<form> <input type="text"> <input type="password"> </form>';

header('Content-type: application/json');
echo json_encode(array(
						'status' 	=> true,
						'message' 	=> 'Deleted Successfully',
						'html' 		=> $html
					));