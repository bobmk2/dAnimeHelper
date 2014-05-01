/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 14/05/01
 * Time: 8:15
 */

//alert("dアニメストア!!");

showAnimeThumbnail();

function showAnimeThumbnail() {
	$('a').each( function(){

		// アニメへのリンクであればリンクを解析してサムネイルを表示
		if ( isAnimeLink( $(this) ) ) {
			var thumbnail_url = createAnimeThumbnailUrl( $(this).attr( "href" ) );
			$(this).append( "<img src='" + thumbnail_url + "'>");
		}
	} );
}

// アニメへのリンクかどうか判定します
// @memo 2014/05/01 時点では <div class="innerA"> を含むリンクエレメントが該当
// @param {object} link	リンクエレメント
// @return アニメへのリンクだった場合は true
function isAnimeLink( link ) {
	var divs = $(link).find( "div");
	var len = divs.length;

	for ( var i = 0; i < len; i++ ) {
		var div = divs.eq(i);
		var class_value = div.attr( "class" );
		if ( class_value === "innerA" ) {
			return true;
		}
	}

	return false;
}

// アニメページURLをパースし。アニメのサムネイル画像のURLを生成します
//
// 関数は以下のようなURLの文字列が渡されることを期待します
// ci_pc?workId=<anime_id>
//
// @param {string} link_url	リンクURL
// @return パースに成功した場合はアニメサムネイルURL / パースに失敗した場合は空文字列
function createAnimeThumbnailUrl( link_url ) {

	var matches = link_url.match( /ci_pc\?workId=(\d*)/ );
	if ( !matches ) {
		return "";
	}

	var anime_id = matches[1];

	// アニメIDが 12345だった場合、画像URLは以下のようになる
	// 12345_x_y.png の x_y は画像サイズのy分のxを表していて、今のところ 1_1(等倍)、1_2(2分の1)、1_3(3分の1)まで確認できている
	// https://kv.anime.dmkt-sp.jp/anime_kv/img/12/34/5/12345_x_y.png

	// 6桁になったらどうなるのかよくわからんので、とりあえず5桁であることを前提とした決め打ち
	if ( anime_id && anime_id.length == 5 ) {
		var base_url = "https://kv.anime.dmkt-sp.jp/anime_kv/img/";
		var footer_1 = anime_id.substr(0,2) + "/" + anime_id.substr(2,2) + "/" + anime_id.substr(4,1) + "/";
		var footer_2 = anime_id + "_1_3.png";	// 3分の1
		return  base_url + footer_1 + footer_2;
	}

	return "";
}