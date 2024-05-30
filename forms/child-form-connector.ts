import { ChildFormControlValueAccessor } from './child-form-control-value-accessor';
import { ChildFormValidator } from './child-form-validator';
import { applyMixins } from '../utils/mixins';

class ChildFormConnector<T> {}
interface ChildFormConnector<T>
	extends ChildFormControlValueAccessor<T>,
		ChildFormValidator {}
applyMixins(ChildFormConnector, [
	ChildFormControlValueAccessor,
	ChildFormValidator,
]);

export default ChildFormConnector;
