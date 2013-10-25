<?php
	$data1	= $_POST["data1"];
	$data2	= $_POST["data2"];
	
	$strResult	= '{';
	$strResult	.='"data1":"'.$data1.'",';
	$strResult	.='"data2":"'.$data2.'"';
	$strResult	.="}";
	
	// 클라이언트로 보낼 응답을 JSON포맷방식으로 문자열을 만들어 보냅니다.
	echo $strResult;
?>