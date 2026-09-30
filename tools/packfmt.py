# Helper: load/save a pack .js wrapper with compact, readable formatting
import json, re
def load(p):
    s = open(p).read()
    return json.loads(s[s.index('{'):s.rindex('}') + 1])
def dumps(obj, ind=0):
    pad = '  ' * ind
    if isinstance(obj, dict):
        if not obj: return '{}'
        one = json.dumps(obj, ensure_ascii=False)
        if len(one) < 110 and not any(isinstance(v, (dict, list)) and v and len(json.dumps(v)) > 60 for v in obj.values()):
            return one.replace('{"', '{ "').replace('"}', '" }').replace('}', ' }').replace('  }', ' }') if False else one
        return '{\n' + ',\n'.join(pad + '  ' + json.dumps(k) + ': ' + dumps(v, ind + 1) for k, v in obj.items()) + '\n' + pad + '}'
    if isinstance(obj, list):
        one = json.dumps(obj, ensure_ascii=False)
        if len(one) < 110 and not any(isinstance(v, dict) for v in obj): return one
        return '[\n' + ',\n'.join(pad + '  ' + dumps(v, ind + 1) for v in obj) + '\n' + pad + ']'
    return json.dumps(obj, ensure_ascii=False)
def save(p, obj):
    open(p, 'w').write('Starways.addPack(\n' + dumps(obj) + '\n);\n')
