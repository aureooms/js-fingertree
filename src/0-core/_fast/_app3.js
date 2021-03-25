import {Empty, Single, Deep} from "../../3-tree/index.js";
import {delay} from "../../4-lazy/index.js";
import {app3} from "../concatenate/index.js";

export function _app3(A, B) {
	B = B.force();

	if (B instanceof Empty) return A;

	if (B instanceof Single) return A.push(B.last());

	return new Deep(
		A.M,
		A.left,
		delay(() => app3(A.middle, A.right._nodes(A.M, B.left), B.middle)),
		B.right
	);
}
