#include <bits/stdc++.h>
using namespace std;
#define fore(i, a, b) for (Long i = a, to = b; i < to; i++)
#define all(v) v.begin(), v.end()
#define rall(v) v.rbegin(), v.rend()
#define SZ(v) (int)v.size()
#define pb push_back
typedef long long Long;
typedef pair<Long, Long> Pair;
vector<Long> v;
int n, m;
bool can(Long x) {
  vector<Long> w;
  Long last = 0;
  fore(i, 0, n) {
    Long mini = v[i];
    Long maxi = v[i] + x;
    if (mini >= last) {
      if (maxi >= last + m)
        continue;
      else
        last = mini;
    } else {
      if (maxi >= last)
        continue;
      else
        return false;
    }
  }
  return true;
}
int main() {
  ios::sync_with_stdio(0);
  cin.tie(NULL);
  cin >> n >> m;
  v.resize(n);
  fore(i, 0, n) cin >> v[i];
  if (can(0)) {
    cout << "0\n";
    return 0;
  }
  Long lo = 0, hi = m;
  while (hi - lo > 1) {
    Long mi = (hi + lo) / 2;
    if (can(mi))
      hi = mi;
    else
      lo = mi;
  }
  cout << hi << '\n';

  return 0;
}